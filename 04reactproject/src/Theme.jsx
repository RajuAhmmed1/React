import React, { useEffect } from "react";
import { useState } from "react";

function Change_color() {
  const [range, setRange] = useState(8);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [character, setCharacter] = useState(false);

  const passowrdGenerator = () => {
    let pss = " ";
    let length = range;
    let char = "ABCDFGFGHJKLOIUIUYTRREEWQZXCVBBMabcdfkldashflkmafhjh";
    let num = "1234567890";
    let sign = "#$%^&*++_)(*";
    let charset = char;

    if (number) charset += num;
    if (character) charset += sign;

    for (let i = 1; i <= length; i++) {
      let pg = Math.floor(Math.random() * charset.length, num.length);
      pss += charset[pg];
    }

    console.log(pss);
    return pss;
  };

  useEffect(() => {
    setPassword(passowrdGenerator());
  }, [range, number, character]);
  return (
    <div className="bg-slate-500 w-1/3 h-[250px] mx-auto my-10 rounded-lg p-10">
      <div className="flex justify-center w-full  mx-auto">
        <input
          className="px-2 py-2 w-[90%] rounded-l-lg outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
        />
        <button
          className="rounded-r-lg bg-red-600 px-2 py-2 text-white"
          type="submit"
        >
          submit
        </button>
      </div>
      <div className="flex flex-col justify-start items-start g-2 mt-5">
        <div>
          <input
            type="range"
            min="8"
            max="30"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
          <br></br>length: {range}
        </div>
        <div className="g-2">
          <label>Number</label>
          <input
            type="checkbox"
            checked={number}
            onChange={(e) => setNumber(e.target.checked)}
          />
        </div>
        <div>
          <label>Special Signs</label>
          <input
            checked={character}
            onChange={(e) => setCharacter(e.target.checked)}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
}

export default Change_color;
