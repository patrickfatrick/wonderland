import React from "react";
import styles from "./Flourish.css";

export default function Flourish() { // eslint-disable-line react/prop-types
  return (
    <div
      className={styles.flourish}
    >
      <div
        className={styles.spacer}
      />
      <div>
        {[...Array(5)].map(() => (
          <span className={styles.star} key={Math.random().toString(32)}>*</span>
        ))}
      </div>
      <div>
        {[...Array(4)].map(() => (
          <span className={styles.star} key={Math.random().toString(32)}>*</span>
        ))}
      </div>
      <div>
        {[...Array(5)].map(() => (
          <span className={styles.star} key={Math.random().toString(32)}>*</span>
        ))}
      </div>
      <div
        className={styles.spacer}
      />
    </div>
  );
}
