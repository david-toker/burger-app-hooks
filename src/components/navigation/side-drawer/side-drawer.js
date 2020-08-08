import React from 'react';
import Logo from '../../logo/logo';
import NavigationItems from '../navigation-items/navigation-items';
import './side-drawer.css';
import Aux from '../../../hoc/Auxx-hoc';
import Backdrop from '../../UI/backdrop/backdrop';

const SideDrawer = (props) => {
    let attachedClasses = "SideDrawer Close";
    if(props.open) {
        attachedClasses = "SideDrawer Open"
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses} onClick={props.closed}>
            <div className="Logo2">
                <Logo/>
            </div>
            
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    );
}

export default SideDrawer;