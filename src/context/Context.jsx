import { createContext } from "react";
import generateContentStream from "../config/gemini";
import { useState } from "react";


export const Context = createContext();

const ContextProvider = ({ children }) => {

    const[input, setInput] = useState("");
    const[recentprompts, setRecentPrompts] = useState("");
    const[showResult, setShowResult] = useState(false);
    const[resultData,setResultData] = useState("");
    const[previousPrompts, setPreviousPrompts] = useState([]);
    const[loading, setLoading] = useState(false);

    const onSent = async()=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompts(input);
        const response = await generateContentStream(input);
        setResultData(response);
        setLoading(false);
        setInput("");
    }

   const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompts,
        recentprompts,
        showResult,
        loading,
        resultData,
        input,
        setInput,
   }
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;