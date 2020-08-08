import React from 'react';
import burgerLogo  from '../../assets/images/burger-logo.png';
import './logo.css';

const Logo = (props) => (
    <div className="Logo">
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default Logo;