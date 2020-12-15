import React from 'react'

import { Switch, Route, Link } from 'react-router-dom'
import ChatsIndex from './ChatsIndex.js'
import Chat from './Chat.js'
import NewChatWindow from './NewChatWindow.js'

import './Chats.css'

class Chats extends React.Component {
    constructor(props) {
        super(props);

        this.createNewChat = this.createNewChat.bind(this)
    }

    createNewChat(info) {
        console.log(info)
    }

    render() {
        return (
            <div id="chat_window">
				<div className="chat_meta">
                    <Switch>
                        <Route exact path={["/chats/peer:id", "/chats/new"]}>
                            <div id="move_back_icon_container">
                                <Link to={"/chats"}>
                                    <img id="move_back_icon" alt="go back" src="/move_back_icon.svg"/>
                                </Link>
                            </div>
                        </Route>
                        <Route exact path="/chats/"> 
                            <div id="chat_meta_container">
                                <div id="chat_meta_left">
                                    All chats
                                </div>
                                <div id="chat_meta_right">
                                    <Link to="/chats/new" className="explicit_link">
                                        Start new chat
                                    </Link>
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </div>
                <Switch>
                    <Route exact path="/chats/new" component={NewChatWindow} handler={this.createNewChat}/>
                    <Route exact path="/chats" component={ChatsIndex}/>
                    <Route exact path="/chats/peer:id" component={Chat}/>
                </Switch>
            </div>
        );
    }
}

export default Chats;
