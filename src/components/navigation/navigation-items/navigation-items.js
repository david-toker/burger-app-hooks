import React from 'react';
import './navigation-items.css';
import NavigationItem from './navigation-item/navigation-item';

const NavigationItems = ( props ) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        { !props.isAuthenticated 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;