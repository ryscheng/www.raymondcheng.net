import * as React from "react";
import clsx from "clsx";
import { Highlight, themes, type PrismTheme } from "prism-react-renderer";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

export interface CodeComparePane {
  title?: string;
  code: string;
  language?: string;
}

interface CodeCompareProps {
  left: CodeComparePane;
  right: CodeComparePane;
}

type DiffLineType =
  | "context"
  | "addition"
  | "deletion"
  | "hunk"
  | "fileHeader"
  | "meta";

const DIFF_LINE_CLASS: Record<DiffLineType, string | undefined> = {
  context: undefined,
  addition: styles.addition,
  deletion: styles.deletion,
  hunk: styles.hunk,
  fileHeader: styles.fileHeader,
  meta: styles.meta,
};

// Diff lines carrying real source code, i.e. everything except the
// git/hunk/file metadata lines, which is what gets JS-tokenized below.
const CODE_LINE_TYPES = new Set<DiffLineType>([
  "context",
  "addition",
  "deletion",
]);

function classifyDiffLine(line: string): DiffLineType {
  if (line.startsWith("+++") || line.startsWith("---")) return "fileHeader";
  if (line.startsWith("@@")) return "hunk";
  if (line.startsWith("diff --git") || line.startsWith("index "))
    return "meta";
  if (line.startsWith("+")) return "addition";
  if (line.startsWith("-")) return "deletion";
  return "context";
}

function DiffPane({
  code,
  prismTheme,
}: {
  code: string;
  prismTheme: PrismTheme;
}) {
  const rawLines = code.replace(/\n$/, "").split("\n");
  const types = rawLines.map(classifyDiffLine);
  // Strip the leading +/-/space marker so the remaining source tokenizes as
  // valid JS; metadata lines are blanked out to keep line indices aligned.
  const codeLines = rawLines.map((line, i) =>
    CODE_LINE_TYPES.has(types[i]) ? line.slice(1) : "",
  );

  return (
    <Highlight
      theme={prismTheme}
      language="javascript"
      code={codeLines.join("\n")}
    >
      {({ tokens, getTokenProps }) =>
        rawLines.map((line, i) => {
          const type = types[i];
          const isCode = CODE_LINE_TYPES.has(type);
          return (
            <span
              key={i}
              className={clsx(styles.line, DIFF_LINE_CLASS[type])}
            >
              {isCode ? (
                <>
                  <span className={styles.marker}>{line[0] ?? " "}</span>
                  {tokens[i]?.map((token, ti) => (
                    <span key={ti} {...getTokenProps({ token, key: ti })} />
                  ))}
                </>
              ) : (
                line
              )}
            </span>
          );
        })
      }
    </Highlight>
  );
}

function PlainPane({
  code,
  language,
  prismTheme,
}: {
  code: string;
  language: string;
  prismTheme: PrismTheme;
}) {
  const trimmed = code.replace(/\n$/, "");
  return (
    <Highlight theme={prismTheme} language={language} code={trimmed}>
      {({ tokens, getTokenProps }) =>
        tokens.map((line, i) => (
          <span key={i} className={styles.line}>
            {line.map((token, ti) => (
              <span key={ti} {...getTokenProps({ token, key: ti })} />
            ))}
          </span>
        ))
      }
    </Highlight>
  );
}

function Pane({ title, code, language = "javascript" }: CodeComparePane) {
  const { colorMode } = useColorMode();
  const prismTheme = colorMode === "dark" ? themes.dracula : themes.github;

  return (
    <div className={styles.pane}>
      {title && <div className={styles.title}>{title}</div>}
      <pre className={styles.pre}>
        <code className={styles.code} style={{ color: prismTheme.plain.color }}>
          {language === "diff" ? (
            <DiffPane code={code} prismTheme={prismTheme} />
          ) : (
            <PlainPane code={code} language={language} prismTheme={prismTheme} />
          )}
        </code>
      </pre>
    </div>
  );
}

const MIN_SPLIT = 15;
const MAX_SPLIT = 85;
const DEFAULT_SPLIT = 50;

function clampSplit(value: number): number {
  return Math.min(MAX_SPLIT, Math.max(MIN_SPLIT, value));
}

function Divider({
  containerRef,
  split,
  onChange,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  split: number;
  onChange: (split: number) => void;
}) {
  const draggingRef = React.useRef(false);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    onChange(clampSplit(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") onChange(clampSplit(split - 2));
    else if (e.key === "ArrowRight") onChange(clampSplit(split + 2));
    else if (e.key === "Home") onChange(DEFAULT_SPLIT);
    else return;
    e.preventDefault();
  };

  return (
    <div
      className={styles.divider}
      role="separator"
      aria-orientation="vertical"
      aria-valuemin={MIN_SPLIT}
      aria-valuemax={MAX_SPLIT}
      aria-valuenow={Math.round(split)}
      aria-label="Resize code panes"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      onDoubleClick={() => onChange(DEFAULT_SPLIT)}
    >
      <div className={styles.dividerHandle} />
    </div>
  );
}

export default function CodeCompare({ left, right }: CodeCompareProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [split, setSplit] = React.useState(DEFAULT_SPLIT);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ gridTemplateColumns: `${split}% 0 ${100 - split}%` }}
    >
      <Pane {...left} />
      <Divider containerRef={containerRef} split={split} onChange={setSplit} />
      <Pane {...right} />
    </div>
  );
}
