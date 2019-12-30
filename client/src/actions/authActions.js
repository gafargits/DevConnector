import axios from 'axios';
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken';

import {SET_CURRENT_USER, GET_ERRORS } from './types'

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        // .catch(err => console.log(err.response.data))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//Login - Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //save to localstorage
            const { token } = res.data;
            //set token to localStorage
            localStorage.setItem('jwtToken', token)
            //set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token)
            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) )
};

//set loggien in user
export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Log user out
export const logoutUser = () => dispatch => {
    //remove token from localStorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false)
    //set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}