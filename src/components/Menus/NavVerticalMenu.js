import React from 'react'
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom'

import './NavVerticalMenu.css'

class NavVerticalMenu extends React.Component {
    render() {
        let options = ["Chats", "About"];

        function render_single(opt) {
            return <li key={opt.toLowerCase()}><NavLink to={"/" + opt.toLowerCase()} activeClassName="active">{opt}</NavLink></li>;
        }

        return (
            <ul className="vertical_menu">
                {options.map(render_single)}
            </ul>
        );
    }
}

export default NavVerticalMenu;
