import { createContext } from "react";
import generateContentStream from "../config/gemini";
import { useState, useEffect} from "react";


export const Context = createContext();

const ContextProvider = ({ children }) => {

    const[input, setInput] = useState("");
    const[recentprompts, setRecentPrompts] = useState("");
    const[showResult, setShowResult] = useState(false);
    const[resultData,setResultData] = useState("");
    const[previousPrompts, setPreviousPrompts] = useState([]);
    const[loading, setLoading] = useState(false);
    const[oldChatIsOpen,setOldChatIsOpen] = useState(false)
    const[currentSessionId,setCurrentSessionId] = useState("")
    

    const[fullChat, setFullChat] = useState(() => {
      const saved = localStorage.getItem('currentChat');
      return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
      const handleBeforeUnload = () => {
          if (fullChat.length > 0) {
            const sessions = JSON.parse(localStorage.getItem('chatSessions')) || [];
          
          if (oldChatIsOpen && currentSessionId) {
            const sessionIndex = sessions.findIndex(
              session => session.id === currentSessionId
            );
            
            if (sessionIndex !== -1) {
              sessions[sessionIndex] = {
                id: currentSessionId,
                messages: fullChat
              };
            }
          } else {
            const newSession = {
              id: Date.now().toString(),
              messages: fullChat
            };
            sessions.push(newSession);
          }
          
          localStorage.setItem('chatSessions', JSON.stringify(sessions));
          localStorage.removeItem('currentChat');
        }
      };
    
      window.addEventListener('beforeunload', handleBeforeUnload);
    
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [oldChatIsOpen, fullChat, currentSessionId]);
    
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
    }

    useEffect(() => {
      localStorage.setItem('currentChat', JSON.stringify(fullChat));
    }, [fullChat]);

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
        fullChat,
        setFullChat,
        setOldChatIsOpen,
        setCurrentSessionId,
        oldChatIsOpen,
        currentSessionId
   }
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;