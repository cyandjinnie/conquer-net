import React from 'react'
import APIClient from '../../services/APIClient.js'
import LoadingAnimation from '../Decorations/LoadingAnimation.js'

import './Chat.css'
import './Chats.css'


class Chat extends React.Component {
    constructor(props) {
        super(props)

        // Save chat id for future convenience
        this.chat_id = props.match.params.id
        this.user_id = APIClient.AuthService.getUserId()

        this.initialState = {
            messages: [],
            counter: 0,
            chat_title: "Loading title...",
            message_draft: "",
            fetched: false,
        }
        this.state = this.initialState

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextarea = this.handleTextarea.bind(this)
        this.messagesEndRef = React.createRef()

        this.fetchChatMessages()
        this.fetchChatTitle()

        this.parseSingleMessage = this.parseSingleMessage.bind(this)
    }

    fetchChatTitle() {
        console.log("my-chats/" + this.chat_id)

        APIClient.fetch("my-chats/" + this.chat_id)
        .then((response) => ( response.json() ))
        .then((processed) => {
            console.log(processed)
            
            this.setState((prevState) => {
                prevState.title = processed.title
                return prevState
            })
        })
    }

    parseSingleMessage(message) {
        return {
            id: message.id,
            type: ( this.user_id == message.from_user ) ? "outcoming" : "incoming",
            text: message.text
        }
    }

    fetchChatMessages() {
        const user_id = this.user_id
        console.log("fetching chat messages...")

        APIClient.fetch("messages/?chat_id=" + this.chat_id)
        .then((response) => ( response.json() ))
        .then((processed) => { 
            console.log(processed)

            let message_set = processed.map(this.parseSingleMessage)

            console.log(message_set)

            this.setState({
                messages: message_set,
                counter: message_set.length,
                fetched: true,
            })
        })
    }

    async sendMessageToApi(text) {
        console.log(JSON.stringify({ 
            text: text,
            chat: this.chat_it,
            from_user: this.user_id,
            datetime: null
        }))

        const http_response = await APIClient.fetch("messages/?chat_id=" + this.chat_id, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({ 
                text: text,
                chat: this.chat_id,
                from_user: this.user_id,
            })
        })

        if (!http_response.ok) {
            console.error("[sendMessageToApi] Something went wrong, couldn't send...")
        } 

        console.log(http_response)

        const json_response = await http_response.json()

        console.log(json_response)

        this.fetchChatMessages()
    }

    async handleSubmit(e) {
        e.preventDefault()
        if (this.state.message_draft === "") {
            return;
        }

        await this.sendMessageToApi(this.state.message_draft)

        // this.setState((prevState) => {
        //     e.preventDefault();

        //     let newId = prevState.counter
        //     let message = prevState.message_draft

        //     let newEntry = { 
        //         id: "" + newId,
        //         type: "outcoming",
        //         text: message
        //     }

        //     let updatedList = [...prevState.messages, newEntry]
        //     console.log(updatedList)

        //     return {
        //         messages: updatedList,
        //         counter: newId + 1,
        //     }
        // })
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
        // Not empty
        if (this.state.messages.length) {
            this.messagesEndRef.current.scrollIntoView({ behavior: "auto" })
        }
    }

    componentDidUpdate() {
        this.scrollToBottomMessage()
    }

    componentDidMount() {
        this.scrollToBottomMessage()
    }

    render() {
        if (!this.state.fetched) {
            return (
                <div>
                    <div className="chat_dialogue_title">
                        Loading...
                    </div>

                    <div id="dialogue_holder">
                        <div style={{ height: "300px"}}>
                            <LoadingAnimation/>
                        </div>
                    </div>       
                    
                    <div className="chat_input_window">
                        <form>
                            <textarea placeholder="Write something..." value={this.state.message_draft} onChange={this.handleTextarea}></textarea>
                            <input type="submit" value='Send!' onClick={this.handleSubmit}/>
                        </form>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="chat_dialogue_title">
                    <span className="title_wrapper"> 
                        <h2>{this.state.title}</h2>
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
