import React from 'react'

import './Chat.css'
import './Chats.css'

class Chat extends React.Component {
    render() {
        return (
            <div>
                <div className="chat_dialogue_title">
                    <span className="title_wrapper"> 
                        <h2>Title</h2>
                    </span>

                    <div className="status_bar_wrapper center">
                        <span className="status_bar light" style={{"float": "right"}}>
                            <span className="status_indicator"></span>
                            <span className="details_text_wrapper">
                                in progress
                            </span>
                        
                        </span>
                    </div>
                </div>

                <div className="message_box incoming">
                    <p>Добрый день!</p>
                </div>
                <div className="message_box outcoming">
                    <p>Здравствуйте!</p>
                </div>
                <div className="message_box incoming">
                    <p>Есть какие-нибудь новости?</p>
                </div>
                <div className="message_box outcoming">
                    <p>Никаких новостей!</p>
                </div>

                <div className="chat_input_window"></div>
            </div>
        );
    }
}

export default Chat;
