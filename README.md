# 🤖 Gemini Clone


## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3
- **State Management**: React Context API
- **AI Integration**: Google Gemini API
- **Storage**: localStorage for chat persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Main/
│   │   ├── Main.jsx          # Main chat interface
│   │   ├── Main.css          # Main component styles
│   │   └── OutputModel.jsx   # AI response display
│   └── Sidebar/
│       ├── Sidebar.jsx       # Chat history sidebar
│       └── Sidebar.css       # Sidebar styles
├── context/
│   └── Context.jsx           # Global state management
├── config/
│   └── gemini.js             # Gemini API configuration
├── assets/
│   └── assets.js             
└── main.jsx                 
```

## 🎯 Key Features Explained

### Chat Sessions
- **New Chat**: Start fresh conversations with the "+" button
- **Load Chat**: Click on any previous chat in the sidebar to continue
- **Edit Chat**: Add new messages to existing conversations
- **Persistent Storage**: All chats are automatically saved to localStorage

### Real-time AI Responses
- **Streaming**: Get responses as they're generated
- **Markdown Support**: Rich text formatting in AI responses
- **Error Handling**: Graceful handling of API errors

