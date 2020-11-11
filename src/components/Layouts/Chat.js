import React from 'react'

import './Chat.css'
import './Chats.css'

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="chat_dialogue_title">
                    <span class="title_wrapper"> 
                        <h2>Title</h2>
                    </span>

                    <div class="status_bar_wrapper center">
                        <span class="status_bar light" style={{"float": "right"}}>
                            <span class="status_indicator"></span>
                            <span class="details_text_wrapper">
                                in progress
                            </span>
                        
                        </span>
                    </div>
                </div>

                <div class="message_box incoming">
                    <p>Добрый день!</p>
                </div>
                <div class="message_box outcoming">
                    <p>Здравствуйте!</p>
                </div>
                <div class="message_box incoming">
                    <p>Есть какие-нибудь новости?</p>
                </div>
                <div class="message_box outcoming">
                    <p>Никаких новостей!</p>
                </div>

                <div class="chat_input_window"></div>
            </div>
        );
    }
}

export default Chat;
