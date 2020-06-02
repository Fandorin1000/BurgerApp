import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = props => {

    let transformedIngredients = []
    let sumIngredients = 0;
    //отличный пример перебора обьекта
    for (let key in props.ingredients) {
        sumIngredients += props.ingredients[key];
        for (let i = 0; i < props.ingredients[key]; i++) {
            transformedIngredients.push(<BurgerIngredients type={key} key={key + i} />);
        }
    }
    if (sumIngredients === 0) {
        //если ингридиенты не добавлены сообщение с просьбой начать добавлять
        transformedIngredients = `Please start adding ingredients`;
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;