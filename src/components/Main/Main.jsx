import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import OutputModel from './OutputModel'
const Main = () => {
    const {
        onSent,
        recentprompts,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        fullChat
    } = React.useContext(Context);
    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user" />
            </div>
            <div className="main-container">
                {!fullChat.length > 0
                    ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brifely summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstrom team bonding activites for our work</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readiblity of the code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <>
                     <div className='result' >
                        {
                            fullChat.length > 0 && fullChat.map((chat, index) => (
                                <div key={index}>
                                    <div className="result-title">
                                        <img src={assets.user_icon} alt="" />
                                        <p>{chat.userInput}</p>
                                    </div>
                                    <div className="result-data">
                                        <img src={assets.gemini_icon} alt="" />
                                        <OutputModel content={chat.content} />
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        {
                            loading &&
                            <div className='result'>
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentprompts}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.gemini_icon} alt="" />
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>

                            </div>
                            </div>
                        }
                    </>
                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />

                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input && <img onClick={() => onSent()} src={assets.send_icon} alt="" />}
                        </div>

                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini App
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
