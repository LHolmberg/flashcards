import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleOnFocus = this.handleOnFocus.bind(this)
    }

    handleChange(event) {
        const { value } = event.target

        if (!isNaN(value)) {
            this.props.setValue(Number(value));
        }
    }

    handleOnFocus(event) {
        this.props.selectCell();
    }

    render() {
        return (
            <input disabled={this.props.disabled} onFocus={this.handleOnFocus} 
                onChange={this.handleChange} className='cell' value={this.props.value} />            
        )
    }
}
