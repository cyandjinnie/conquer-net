import React from 'react'
import './ChatsIndex.css'
import APIClient from '../../services/APIClient.js'
import LoadingAnimation from '../Decorations/LoadingAnimation.js'

import ChatDialogueEntry from './ChatDialogueEntry.js'

function getStatusColor(status) {
    switch (status) {
        case "IP": return "#7FFF00";
        case "IS": return "yellow";
        case "OH": return "red";
    }
}

function getStatusString(status) {
    switch (status) {
        case "IP": return "in progress";
        case "IS": return "issues";
        case "OH": return "on hold";
    }
}

class ChatsIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = { entries_fetched: false }

        this.chat_entries = [
            {
                id: "1",
                title: "Title",
                status_string: "in progress",
                header_message: "",
                status_color: "#33cc33",
            },
            {
                id: "2",
                title: "Planned work for <...>",
                status_string: "assigned",
                header_message: "",
                status_color: "yelllow"
            }
        ]

        console.log(this.chat_entries);
        this.fetchChatEntries()
    }

    parseEntry(entry) {
        return {
            id: entry.id,
            title: entry.title,
            status_string: getStatusString(entry.status),
            header_message: "",
            status_color: getStatusColor(entry.status)
        }
    }

    fetchChatEntries() {
        APIClient.fetch("my-chats/", { method: "GET" })
        .then((response) => ( response.json() ))
        .then((processed) => { this.chat_entries = processed.map(this.parseEntry) })
        .then(() => { this.setState({ entries_fetched: true }) })
    }

    render_single_entry(entry) {
        return (
            <ChatDialogueEntry 
                id={entry.id}
                title={entry.title} 
                status_string={entry.status_string}
                header_message={entry.header_message}
                status_color={entry.status_color}
                key={"dialogue_sel_" + entry.id}
            />
        );
    }

    render() {
        if (!this.state.entries_fetched) {
            return (
                <div id="chat_window">
                    <div className="animation-center-out">
                        <LoadingAnimation/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {this.chat_entries.map(this.render_single_entry)}
            </div>
        );
    }
}

export default ChatsIndex;
