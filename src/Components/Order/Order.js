import React from 'react'
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }
    const ingredientOutput = ingredients.map(ingr => {
        return (
            <span key={ingr.name}
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    padding: "5px",
                    border: "1px solid #ccc"
                }}>
                {ingr.name} : {ingr.amount}
            </span>
        )
    })

    return (
        <div className={classes.Order} onClick={props.clicked}>
            <p>ID order: {props.id}</p>
            <p>Date order: {props.date}</p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Total Price:  <strong>{+parseFloat(props.price).toFixed(2)}</strong> USD</p>
        </div>
    )
}

export default Order;