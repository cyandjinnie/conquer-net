import React from 'react'

import {Switch, Route} from 'react-router-dom'
import ChatsIndex from './ChatsIndex.js'
import Chat from './Chat.js'

import './Chats.css'

class Chats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="chat_window">
				<div className="chat_meta"></div>
                    <Switch>
                        <Route exact path="/chats" component={ChatsIndex}/>
                        <Route exact path="/chats/:id" component={Chat}/>
                    </Switch>
            </div>
        );
    }
}

export default Chats;
