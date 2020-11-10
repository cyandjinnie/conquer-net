import React from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

import './NavVerticalMenu.css'

class NavVerticalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.active = props.active;
    };

    render() {
        let options = ["Chats", "Events", "Departments"];
        const active = this.active;

        function render_single(opt) {
            return <li><Link to={"/" + opt.toLowerCase()}>{opt}</Link></li>;
        }

        return (
            <ul class="vertical_menu">
                {options.map(render_single)}
            </ul>
        );
    }
}

export default NavVerticalMenu;
