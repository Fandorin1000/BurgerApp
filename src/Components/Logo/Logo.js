import React from 'react';
import classes from './Logo.module.css';
import BurgerLogo from '../../Assets/Images/BurgerLogo.png';

const Logo = props => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={BurgerLogo} alt="MyBurger" />
    </div>

)

export default Logo;