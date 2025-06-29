import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';
const Sidebar = () => {

  const [extended, setextended] = useState(false);
  const {onSent,previousPrompts,setPreviousPrompts,setFullChat,setOldChatIsOpen,setCurrentSessionId} = useContext(Context)

  useEffect(()=>{
    const saved = localStorage.getItem('chatSessions');
    setPreviousPrompts( saved ? JSON.parse(saved) : []);
  },[])

  const handleChatClick = (session)=>{
    setOldChatIsOpen(true)
    setFullChat(session.messages);
    setCurrentSessionId(session.id);
  }

  const handleNewChat = () => {
    setOldChatIsOpen(false);
    setCurrentSessionId("");
    setFullChat([]);
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img 
          onClick={() => setextended(!extended)}
          className='menu' 
          src={assets.menu_icon} 
          alt="Menu" 
        />
        <div className="new-chat" onClick={handleNewChat}>
          <img src={assets.plus_icon} alt="Add Chat" />
          {extended && <p>New Chat</p>}
        </div>
        {extended &&
          <div className="recent">
            <p className="recent-title">Recent</p>
            {
              previousPrompts.map((session, index) => {
                const firstUserInput = session.messages[0]?.userInput || "No user input";
                const preview = firstUserInput.split(' ').slice(0, 3).join(' ');
                const displayText = firstUserInput.split(' ').length > 3 ? preview + '...' : preview;
                
                return (
                  <div onClick={()=>handleChatClick(session)} className="recent-entry" key={index} >
                    <img src={assets.message_icon} alt="" />
                    <p>{displayText}</p>
                  </div>
                );
              })
            }
           
          </div>
        }

      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
