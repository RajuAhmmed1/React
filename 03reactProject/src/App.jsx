import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [color, setColor] = useState("white");
  const clour = (e) => {
    return setColor(e);
  };

  console.log(color);

  return (
    <div
      style={{ backgroundColor: color }}
      className=" p-2 w-full h-screen inset-0 bg-slate-500 "
    >
      <div className=" fixed flex gap-10 justify-center bottom-12 flex-wrap px-2 inset-x-0">
        <button
          onClick={() => {
            clour("black");
          }}
          className="  bg-black text-white px-7 py-2 rounded-2xl"
        >
          Black
        </button>
        <button
          onClick={() => {
            setColor("red");
          }}
          className=" bg-red-700 text-white px-7 py-2 rounded-2xl"
        >
          Red
        </button>
        <button
          onClick={() => {
            setColor("green");
          }}
          className=" bg-green-900 text-white px-7 py-2 rounded-2xl"
        >
          Green
        </button>
        <button
          onClick={() => {
            setColor("yellow");
          }}
          className=" bg-yellow-600 text-white px-7 py-2 rounded-2xl"
        >
          Yellow
        </button>
        <button
          onClick={() => {
            setColor("blue");
          }}
          className=" bg-blue-700 text-white px-7 py-2  rounded-2xl"
        >
          Blue
        </button>
      </div>
    </div>
  );
}

export default App;
