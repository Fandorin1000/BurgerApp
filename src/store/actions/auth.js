import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({ type: actionTypes.AUTH_START })

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
})
export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error: error })

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return { type: actionTypes.AUTH_LOGOUT }
}

export const checkAuthTimeout = (expiresIn = 3600) => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, expiresIn * 1000)
}

export const auth = (email, password, isSignup) => async dispatch => {

    await dispatch(authStart())
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOw06mcH69wm1W2cFKBA2uGRNEAjNRc5s';
    if (!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOw06mcH69wm1W2cFKBA2uGRNEAjNRc5s'
    }
    const response = await axios.post(url, authData)
    try {
        console.log(response)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        await dispatch(authSuccess(response.data.idToken, response.data.localId))
        await dispatch(checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        console.log(error)
        dispatch(authFail(error.response.data.error))
    }
}

export const setAuthRedirectPath = path => ({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path })

export const authCkeckState = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId');
            await dispatch(authSuccess(token, userId))
            await dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }

    }

}