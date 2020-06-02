import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../NavigationItems/SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <div className={classes.DrawerToggleBox}>
            <DrawerToggle className={classes.DrawerToggle} clicked={props.toggleSideDrawer} />
        </div>

        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.DesktopOnly}>
            <NavigationItems
                isAuth={props.isAuth}
            />
        </nav>
    </header>
)

export default Toolbar;