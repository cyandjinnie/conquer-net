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
                <Link to={"/chats/peer" + this.props.id}>
                    <div className="chat_dialoque">
                        <div className="chat_image_wrapper">
                            <div className="center">
                                <div className="chat_image"></div>
                            </div>
                        </div>
                        <div className="chat_text_wrapper">
                            <div className="chat_title">{ this.props.title }</div>

                            <div className="chat_details">
                                <span className="status_bar dark">
                                    <span className="status_indicator" style={{"backgroundColor": this.props.status_color}}></span>
                                    <span className="details_text_wrapper">
                                        { this.props.status_string }
                                    </span>
                                    
                                </span>
                                <span className="chat_header_msg">
                                    { this.props.header_message }
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="chat_element"><hr/></div>
            </div>
            
            
        );
    }
}

export default ChatDialogueEntry;
