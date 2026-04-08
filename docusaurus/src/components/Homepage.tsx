import * as React from "react";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.illustrationBox}>
          <img
            src="/img/meIllustration.png"
            alt="Raymond Cheng illustration"
            className={styles.illustration}
          />
        </div>
        <div className={styles.content}>
          <span className={styles.name}>Raymond Cheng</span>
          <span className={styles.tagline}>
            Bringing privacy and funk to the people
          </span>
          <img
            src="/img/emailaddrjpg.jpg"
            alt="email address"
            className={styles.emailImg}
          />
          <div className={styles.socialRow}>
            <img
              src="/img/twittersvg.svg"
              alt="Twitter"
              className={styles.socialIcon}
            />
            <a
              href="https://twitter.com/RaymondCheng00"
              target="_blank"
              rel="noopener noreferrer"
            >
              @RaymondCheng00
            </a>
          </div>
          <div className={styles.socialRow}>
            <img
              src="/img/githubMarksvg.svg"
              alt="GitHub"
              className={styles.socialIcon}
            />
            <a
              href="https://github.com/ryscheng"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ryscheng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
