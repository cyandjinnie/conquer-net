import React from 'react'
import './Nav.css'
import NavVerticalMenu from './Menus/NavVerticalMenu.js'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.section = props.section;
    }

    render() {
        return (
            <div class="narrow_column">
                <center>
                    <div id="personal_info_bar">
                        <div id="avatar_frame"></div>
                        <div>
                            Игорь Максимов
                        </div>
                    </div>
                    
                    <ul class="horizontal_menu">
                        <li>Settings</li>
                        <li>|</li>
                        <li>Exit</li>
                    </ul>
                </center>

                <NavVerticalMenu active={this.section}/>
		    </div>
        );
    }
}

export default Nav;
