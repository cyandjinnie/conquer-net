import React from 'react'
import './About.css'

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="about_text_container">
                <div class="about_header_strip">
                    <div class="center">
                        <h2>About</h2>
                    </div>
                </div>
                <p>
                    This is a task-oriented social network allowing to manage short tasks, communicate better and not trash your ordinary social networks with job matter and other staff
                </p>
            </div>
        );
    }
}

export default About;
