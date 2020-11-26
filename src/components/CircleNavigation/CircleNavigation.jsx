import React from "react";
import styles from "./CircleNavigation.module.sass";

const CircleNavigation = ({ active, onClickFirstCircle }) => (
  <div className={styles.containerCircle}>
    <div
      onClick={onClickFirstCircle}
      style={{ backgroundColor: active === 0 ? "#69e0da" : "#f0f0f0" }}
    />
    <div style={{ backgroundColor: active === 1 ? "#69e0da" : "#f0f0f0" }} />
    <div style={{ backgroundColor: active === 2 ? "#69e0da" : "#f0f0f0" }} />
  </div>
);

export default CircleNavigation;
