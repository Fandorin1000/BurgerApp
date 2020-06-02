import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const BuildControls = props => (
    < div className={classes.BuildControls} >
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(controlItem => <BuildControl
            key={controlItem.label}
            type={controlItem.type}
            label={controlItem.label}
            addIngredient={() => props.addIngredient(controlItem.type)}
            disabled={props.disabled[controlItem.type]}
            removeIngredient={() => props.removeIngredient(controlItem.type)}
        />)}
        <button
            className={classes.OrderButton}
            disabled={props.isPurchase}
            onClick={props.showOrderModal}
        >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div >
);

export default BuildControls;