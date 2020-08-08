import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation-item.css';

const NavigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink
            to={props.link}
            activeClassName="active"
            exact={props.exact}>{props.children}</NavLink>
    </li>
)

export default NavigationItem;