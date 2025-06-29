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
    const[fullChat, setFullChat] = useState([
        {
            userInput: "Hello, how are you?",
            content: "Hi there! I'm doing great, thank you for asking. I'm here to help you with any questions or tasks you might have. How can I assist you today?"
        },
        {
            userInput: "Can you help me with React development?",
            content: "Absolutely! I'd be happy to help you with React development. React is a popular JavaScript library for building user interfaces. What specific aspect of React would you like to work on? Are you looking to learn the basics, work on a specific project, or troubleshoot some code?"
        },
        {
            userInput: "What are React hooks?",
            content: "React Hooks are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8. Here are the most commonly used hooks:\n\n1. **useState** - for managing state\n2. **useEffect** - for side effects (like API calls)\n3. **useContext** - for consuming context\n4. **useRef** - for accessing DOM elements\n5. **useMemo** - for memoizing expensive calculations\n6. **useCallback** - for memoizing functions\n\nHooks must be called at the top level of your component and can't be called inside loops, conditions, or nested functions."
        }
    ])


    
    const onSent = async()=>{
        if (!input.trim()) return;
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompts(input);
        const response = await generateContentStream(input);
        setResultData(response);
        setFullChat(prev => [...prev, { userInput: input, content: response }]);
        setLoading(false);
        setInput("");
        console.log(fullChat);
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
        fullChat
   }
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;