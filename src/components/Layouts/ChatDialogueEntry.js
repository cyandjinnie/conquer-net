import React from 'react'
import './ChatDialogueEntry.css'
import './Chats.css'

import { Link } from 'react-router-dom'

class ChatDialogueEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={"/chats/" + this.props.id}>
                    <div class="chat_dialoque">
                        <div class="chat_image_wrapper">
                            <div class="center">
                                <div class="chat_image"></div>
                            </div>
                        </div>
                        <div class="chat_text_wrapper">
                            <div class="chat_title">{ this.props.title }</div>

                            <div class="chat_details">
                                <span class="status_bar dark">
                                    <span class="status_indicator" style={{"background-color": this.props.status_color}}></span>
                                    <span class="details_text_wrapper">
                                        { this.props.status_string }
                                    </span>
                                    
                                </span>
                                <span class="chat_header_msg">
                                    { this.props.header_message }
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>

                <div class="chat_element"><hr/></div>
            </div>
            
            
        );
    }
}

export default ChatDialogueEntry;
