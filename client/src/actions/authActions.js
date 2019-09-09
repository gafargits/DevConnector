import axios from 'axios'
import { GET_ERRORS } from './types'
//Register User
export const registerUser = (userData, history) => dispatch => {
    // return {
    //     type: TEST_DISPATCH,
    //     payload: userData
    // }
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