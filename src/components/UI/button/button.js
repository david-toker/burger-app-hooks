import React from 'react';
import './button.css';

const Button = (props) => (
    <button
        disabled={props.disabled}
        className={props.btnType}
        onClick={props.clicked}>{props.children}</button>
)

export default Button;