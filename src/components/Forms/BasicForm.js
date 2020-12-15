import React from 'react'
import './BasicForm.css'
import '../Layout.css'

class BasicForm extends React.Component {
    constructor(props) {
        super(props)
        this.specs = this.props.specs;

        this.state = this.getInitialState()
        this.handlers = this.createHandlers();

        console.log(this.state)
        console.log(this.handlers)
    }

    submitHandler(e) {
        e.preventDefault()
        console.log(this.state)
        this.setState(this.getInitialState())
    }

    // Handlers for each form elements
    createHandlers() {
        let handlers = {}

        this.specs.forEach((spec) => {
            let textfieldHandler = ((e) => {
                e.preventDefault()
                this.setState({ [spec.ref] : e.target.value })
                console.log(e.target.value)
            })
            textfieldHandler = textfieldHandler.bind(this)

            handlers[spec.ref] = ( spec.type === "submit" ) ? (
                this.submitHandler.bind(this)
            ) : (
                textfieldHandler
            )
        })

        return handlers;
    }

    // Fill in blanks for each form element
    getInitialState() {
        let initialState = {}

        this.specs.forEach((spec) => {
            initialState[spec.ref] = ""
        })

        return initialState
    }

    // Fill in blanks for each form element
    // componentDidMount() {
    //     this.specs.forEach((spec) => {
    //         this.setState((prevState) => { 
    //             console.log(prevState)

    //             return {
    //                 [spec.ref] : ""
    //             } 
    //         });
    //     })
    // }

    renderSingleFormElement(specs) {
        switch (specs.type) {
            case "text":
            case "password":
                return (
                    <div className="form-element-wrapper" key={specs.ref}>
                        <div><b>{specs.label}</b></div>
                        <input type={specs.type} value={this.state[specs.ref]} onChange={this.handlers[specs.ref]} placeholder={specs.placeholder}/>
                    </div>
                )
            case "submit":
                return (
                    <div className="form-element-wrapper" key={specs.ref}>
                        <p>
                            <input type="submit" onClick={this.handlers[specs.ref]} value={specs.label}/>
                        </p>
                    </div>
                )
            case "select":
                return (
                    <div className="form-element-wrapper" key={specs.ref}>
                        <div><b>{specs.label}</b></div>
                        <select value={this.state[specs.ref]} onChange={this.handlers[specs.ref]}>
                            <option value="none">{specs.placeholder}</option>
                            {specs.options.map((option) => (
                                <option value={option.value} key={specs.ref + option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                )
            default:
                console.error("[ERR] Unknown form type! \"" + specs.type + "\"")
        }
    }

    renderForm(specs_array) {
        return (
            <div className="form-wrapper">
                <form>
                    {specs_array.map(this.renderSingleFormElement.bind(this))}
                </form>
            </div>
        )
    }
        
    render() {
        return this.renderForm(this.specs)
    }
}

export default BasicForm;
