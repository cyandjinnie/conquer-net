import React from 'react'
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom'

import './NavVerticalMenu.css'

class NavVerticalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.active = props.active;
    };

    render() {
        let options = ["Chats", "About"];
        const active = this.active;

        function render_single(opt) {
            return <li><NavLink to={"/" + opt.toLowerCase()} activeClassName="active">{opt}</NavLink></li>;
        }

        return (
            <ul class="vertical_menu">
                {options.map(render_single)}
            </ul>
        );
    }
}

export default NavVerticalMenu;
