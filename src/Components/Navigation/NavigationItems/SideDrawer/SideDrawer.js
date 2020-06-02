import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    let attachedClass = [classes.SideDrawer, classes.Close];

    if (props.showModal) {
        attachedClass = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxiliary>
            <Backdrop showModal={props.showModal} closeModal={props.closeModal} />
            <div className={attachedClass.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav onClick={props.closeModal}>
                    <NavigationItems
                        isAuth={props.isAuth}

                    />
                </nav>
            </div>
        </Auxiliary>
    )
}

export default SideDrawer;