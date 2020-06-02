import React from 'react';
import classes from './Backdrop.module.css';
const Backdrop = props => {
    return (
        props.showModal ? <div className={classes.Backdrop} onClick={props.closeModal}></div> : null
    )
}

export default Backdrop;