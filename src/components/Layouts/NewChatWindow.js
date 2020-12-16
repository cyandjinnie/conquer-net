import React from 'react'
import BasicForm from '../Forms/BasicForm.js' 

import './NewChatWindow.css'

class NewChatWindow extends React.Component {
    constructor(props) {
        super(props)

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

    handleSubmit(data) {
        console.log(data)
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
            </div>
        )
    }
}

export default NewChatWindow;