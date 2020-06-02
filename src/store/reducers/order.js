import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    orders: [],
    isLoading: false,
    isPurchased: false
};

const purchaseInit = (state, action) => {
    return updatedObject(state, { isPurchased: false })
}

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, { isLoading: true })
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, { id: action.orderId })
    return updatedObject(state, {
        isLoading: false,
        isPurchased: true,
        orders: state.orders.concat(newOrder)
    })
}
const puchaseBurgerFail = (state, action) => {
    return updatedObject(state, { isLoading: false })
}
const fetchOrdersStart = (state, action) => {
    return updatedObject(state, { isLoading: true })
}
const fetchOrdersSuccess = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
        isLoading: false
    })
}
const fetchOrdersFail = (state, action) => {
    return updatedObject(state, { isLoading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return puchaseBurgerFail(state, action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
        default: return state;
    }
}

export default reducer;