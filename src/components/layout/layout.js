import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxx-hoc';
import Toolbar from '../navigation/toolbar/toolbar';
import './layout.css';
import SideDrawer from '../navigation/side-drawer/side-drawer';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }


    
    return (
    <Aux>
        <Toolbar
            isAuth={props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer
            isAuth={props.isAuthenticated}
            open={sideDrawerIsVisible}
            closed={sideDrawerClosedHandler}/>
        <main className="Content">
            {props.children}
        </main>
    </Aux>
    )
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token!==null
    };
};


export default connect(mapStateToProps)(Layout);