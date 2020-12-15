import React from 'react'

import './Chat.css'
import './Chats.css'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        let messages_arr = [
            {
                id: "1",
                type: "incoming",
                text: "Добрый день!"
            },
            {   
                id: "2",
                type: "outcoming",
                text: "Здравствуйте!"
            },
            {
                id: "3",
                type: "incoming",
                text: "Есть какие-нибудь новости?"
            },
            {
                id: "4",
                type: "outcoming",
                text: "Никаких новостей!"
            },
            {
                id: "5",
                type: "incoming",
                text: "Some trash"
            },
            {
                id: "6",
                type: "outcoming",
                text: "Some trash"
            },
            {
                id: "7",
                type: "incoming",
                text: "Some trash Some trash Some trash Some trash " + 
                      "Some trash Some trash Some trash Some trash " +
                      "Some trash Some trash Some trash Some trash "
                    
            },
            {
                id: "8",
                type: "outcoming",
                text: "Some trash Some trash Some trash Some trash " + 
                      "Some trash Some trash Some trash Some trash " +
                      "Some trash Some trash Some trash Some trash "
            },
            {
                id: "9",
                type: "outcoming",
                text: "Some trash Some trash Some trash Some trash " + 
                      "Some trash Some trash Some trash Some trash " +
                      "Some trash Some trash Some trash Some trash "
            },
        ]

        this.state = {
            messages: messages_arr,
            counter: 20,
            message_draft: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextarea = this.handleTextarea.bind(this)

        this.messagesEndRef = React.createRef()
    }

    handleSubmit(e) {
        if (this.state.message_draft === "") {
            e.preventDefault();
            return;
        }

        // Pass handling to react
        this.setState((prevState) => {
            e.preventDefault();

            let newId = prevState.counter
            let message = prevState.message_draft

            let newEntry = { 
                id: "" + newId,
                type: "outcoming",
                text: message
            }

            let updatedList = [...prevState.messages, newEntry]
            console.log(updatedList)

            return {
                messages: updatedList,
                counter: newId + 1,

                // Clear the window
                message_draft: ""
            }
        })
    }

    handleTextarea(e) {
        this.setState({ message_draft: e.target.value });
    }

    renderMessageBox(entry) {
        return (
            <div className={"message_box " + entry.type} key={"msg_" + entry.id}>
                    <p>{entry.text}</p>
            </div>
        );
    }

    scrollToBottomMessage = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }

    componentDidUpdate() {
        this.scrollToBottomMessage()
    }

    componentDidMount() {
        this.scrollToBottomMessage()
    }

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

                <div id="dialogue_holder">
                    {this.state.messages.map(this.renderMessageBox)}
                    <div ref={this.messagesEndRef}></div>
                </div>

                <div className="chat_input_window">
                    <form>
                        <textarea placeholder="Write something..." value={this.state.message_draft} onChange={this.handleTextarea}></textarea>
                        <input type="submit" value='Send!' onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        );

        // <div className="chat_input_window"></div>
    }
}

export default Chat;
