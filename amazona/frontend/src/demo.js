import { createContext } from "react";

export const demoContext = createContext(); // Ensure this is named correctly

function DemoProvider({ children }) {
  const ab = "hello world"; // The value you want to share across components
  return <demoContext.Provider value={ab}>{children}</demoContext.Provider>;
}

export default DemoProvider;
