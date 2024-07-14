import { useState } from "react";
import "./index.css";

function App() {
  return (
    <div className="flex flex-row flex-wrap bg-slate-900 text-white">
      <div className="brand-name">
        <h1>BrandName</h1>
      </div>
      <ul className="flex ">
        <li className="text-2xl">
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Service</a>
        </li>
        <li>
          <a href="#">Project</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
}

export default App;
