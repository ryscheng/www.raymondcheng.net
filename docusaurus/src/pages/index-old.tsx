import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { PlasmicRootProvider, PlasmicComponent } from "@plasmicapp/loader-react";

import styles from "./index.module.css";
import { PLASMIC } from "../plasmic-init";
import Homepage from "../components/plasmic/Homepage";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/about">
            About Me
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Raymond Cheng's personal website">
      <PlasmicRootProvider loader={PLASMIC}>
        <div className={styles.autoMargin} >
          <Homepage />
        </div>
        <div className={styles.autoMargin} >
          <iframe
            src={"https://ryscheng.substack.com/embed"}
            width={480}
            height={120}
            style={{
              border: "1px solid #EEE",
              background: "white",
            }}
            scrolling={"no"}
          />
        </div>
      </PlasmicRootProvider>
    </Layout>
  );
}
