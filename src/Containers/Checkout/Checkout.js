import React from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }
    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const isPurchasedRedirect = this.props.isPurchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {isPurchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancelCheckout={this.cancelCheckoutHandler}
                        continueCheckout={this.continueCheckoutHandler} />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    isPurchased: state.order.isPurchased
})


export default connect(mapStateToProps)(Checkout);