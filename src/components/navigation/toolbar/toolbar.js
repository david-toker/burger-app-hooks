import React from 'react';
import './toolbar.css';
import Logo from '../../logo/logo';
import NavigationItems from '../navigation-items/navigation-items';
import DrawerToggle from '../side-drawer/drawer-toggle/drawer-toggle';

const Toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className="Logo1">
            <Logo/>
        </div>
        <nav className="DesktopOnly">
        <NavigationItems isAuthenticated={props.isAuth}/>  
        </nav>
    </header>
);

export default Toolbar;