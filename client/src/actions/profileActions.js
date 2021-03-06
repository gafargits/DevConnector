import axios from 'axios';

import { CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING } from './types'

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      }))
}

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//clear loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}