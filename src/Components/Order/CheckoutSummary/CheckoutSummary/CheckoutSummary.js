import React from 'react';
import Burger from '../../../Burger/Burger';
import Button from '../../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <p style={{ textAlign: "center" }}>Its checkout summary</p>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
                <Button clicked={props.cancelCheckout} btnType="Danger">Cancel</Button>
                <Button clicked={props.continueCheckout} btnType="Success">Continue</Button>
            </div>
        </div>

    )
}

export default CheckoutSummary