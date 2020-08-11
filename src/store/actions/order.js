import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
})

export const purchaseBurgerFail = error => ({ type: actionTypes.PURCHASE_BURGER_FAIL, error: error })
export const purchaseBurgerStart = () => ({ type: actionTypes.PURCHASE_BURGER_START })
export const purchaseBurger = (orderData, token) => async dispatch => {
    await dispatch(purchaseBurgerStart())
    const response = await axios.post('/orders.json?auth=' + token, orderData)
    try {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    } catch (error) {
        dispatch(purchaseBurgerFail(error))
    };
}
export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT })
export const fetchOrdersSuccess = orders => ({ type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders })
export const fetchOrdersFail = (error) => ({ type: actionTypes.FETCH_ORDERS_FAIL, error: error })
export const fetchOrdersStart = () => ({ type: actionTypes.FETCH_ORDERS_START })

export const fetchOrders = (token, userId) => async dispatch => {
    await dispatch(fetchOrdersStart())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = await axios.get('/orders.json' + queryParams)
    try {
        const fetchedOrders = []
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        await dispatch(fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        dispatch(fetchOrdersFail(error))
    }
}
