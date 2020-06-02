import React from 'react';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    render() {
        const ingredients = this.props.ingredients;
        const modalIngredients = Object.keys(ingredients)
            .map(ingrItem => {
                return <li key={ingrItem}>
                    <span style={{ textTransform: "capitalize" }}>{ingrItem} </span>: {ingredients[ingrItem]}
                </li >
            })
        return (
            <div className={classes.OrderSummary} >
                <h3>Your order </h3>
                <p>Your ingredients in delicious burger:</p>
                <ul>
                    {modalIngredients}
                </ul>
                <p>Total price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelOrderInModal}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueOrderInModal}>CONTINUE</Button>
            </div>
        )
    }


}
export default OrderSummary;