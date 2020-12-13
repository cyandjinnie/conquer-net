import React from 'react'
import './About.css'

class About extends React.Component {
    render() {
        return (
            <div className="about_text_container">
                <div className="about_header_strip">
                    <div className="center">
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
