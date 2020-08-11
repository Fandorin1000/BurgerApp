import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }
    state = {
        totalPrice: 4,
        isPurchase: true,
        isShowModal: false,
    }
    componentDidMount() {
        this.props.onInitIngredients()
    }
    isPurchasedOrderHandler = (ingredients) => {
        let checkIngredients = Object.keys(ingredients)
            .map(ingItem => {
                return ingredients[ingItem]
            })
            .reduce((sum, item) => {
                return sum + item;
            })
        return checkIngredients <= 0
    }

    showModalHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ isShowModal: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    backdropClosingModalHandler = () => {
        this.setState({ isShowModal: false })
    }
    continueOrderInModalHandler = () => {
        // alert('You are continued');

        //отличный способ передать параметры в необходимый компонент
        // this.props.history.push({
        //     pathname: '/checkout',
        //     state: this.state.ingredients
        // })
        //отличный способ передать параметры в необходимый компонент
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const { isAuthenticated, onIngredientAdded, onIngredientRemoved, price, error, ings } = this.props
        const disabledInfo = {
            ...ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;

        }
        let orderSummary = null;
        let burger = error ? <p style={{ textAlign: "center" }}>Danger this Application has ERROR</p> : <Spinner />
        if (ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={ings} />
                    <BuildControls
                        isAuth={isAuthenticated}
                        addIngredient={onIngredientAdded}
                        removeIngredient={onIngredientRemoved}
                        disabled={disabledInfo}
                        price={price}
                        isPurchase={this.isPurchasedOrderHandler(ings)}
                        showOrderModal={this.showModalHandler}
                    />

                </Auxiliary>
            )
            orderSummary = <OrderSummary
                ingredients={ings}
                cancelOrderInModal={this.backdropClosingModalHandler}
                continueOrderInModal={this.continueOrderInModalHandler}
                price={price} />
        }
        return (
            <Auxiliary>
                <Modal showModal={this.state.isShowModal} closeModal={this.backdropClosingModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>

        )

    }

}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null

})
const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));