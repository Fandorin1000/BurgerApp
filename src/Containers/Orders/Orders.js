import React from 'react'
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)

    }
    render() {
        let orders = <Spinner />
        if (!this.props.isLoading) {
            orders = (
                this.props.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            id={order.id}
                            price={order.totalPrice}
                            date={order.date}
                            ingredients={order.ingredients}

                        />
                    )
                }))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId
})
const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));