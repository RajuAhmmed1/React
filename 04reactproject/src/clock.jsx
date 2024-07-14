import React, { useState, useEffect } from "react";

function SetTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  console.log(currentTime);

  return (
    <div className="flex items-center justify-center">
      {currentTime.toString()}
    </div>
  );
}

export default SetTime;
