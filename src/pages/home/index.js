import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import s from "./index.module.less";
import car from "./images/car2.png";

const App = () => {
  const [count, setCounts] = useState(100);
  const onChange = () => {
    const dd = count + 1;
    const bb = { b: 1 };
    setCounts(dd);
    console.log(bb?.b);
  };
  return (
    <>
      <img src={car} />
      <div className={s?.bg} onClick={onChange}>
        990122
      </div>
      <div className={s?.div}>{count}</div>
    </>
  );
};
const root = document.getElementById("root");

if (root) {
  createRoot(root).render(<App />);
}
