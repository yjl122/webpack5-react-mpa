import React from "react";
import { createRoot } from "react-dom/client";
import car from "./images/car2.png";
import s from "./index.module.less";

const App = () => {
  return (
    <>
      <img src={car} />
      <div className={s.bgg}></div>
    </>
  );
};
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
