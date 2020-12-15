import React from 'react'
import BasicForm from '../Forms/BasicForm.js' 

import './NewChatWindow.css'

class NewChatWindow extends React.Component {
    constructor(props) {
        super(props)

        this.passChatInfo = props.createNewChat;

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handlePeerChange = this.handlePeerChange.bind(this)

        this.state = {
            title: "",
            peer: "",
        }

        this.form_specs = [
            {
                type: "text",
                placeholder: "Chat title",
                label: "Your chat title",
                ref: "title"
            },
            {
                type: "select",
                placeholder: "Choose a peer...",
                label: "Peer",
                ref: "peer",
                options: [
                    {
                        value: "opt1",
                        label: "Option 1"
                    },
                    {
                        value: "opt2",
                        label: "Option 2"
                    }
                ],
            },
            {
                type: "submit",
                label: "Create",
                ref: "submit"
            }
        ]
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState((prevState) => {
            console.log(this.state)

            return {
                title: "",
                peer: "",
            }
        })
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
        console.log(e.target.value)
    }

    handlePeerChange(e) {
        this.setState({ peer: e.target.value })
        console.log(e.target.value)
    }

    render() {
        return (
            <div id="form-container">
                <center>
                    <h1>
                        Create new chat
                    </h1>
                    <BasicForm specs={this.form_specs}/>
                </center>

                {/* <form>
                    <input type="text" placeholder="Chat title" onChange={this.handleTitleChange} value={this.state.title}></input>
                    <select onChange={this.handlePeerChange} value={this.state.peer}>
                        <option value="None"></option>
                        <option value="Random dude1">Some random dude 1</option>
                        <option value="Random dude2">Some random dude 2</option>
                        <option value="Random dude3">Some random dude 3</option>
                    </select>
                    <input type="submit" onClick={this.handleSubmit} value='Submit!'></input>
                </form> */}
            </div>
        )
    }
}

export default NewChatWindow;