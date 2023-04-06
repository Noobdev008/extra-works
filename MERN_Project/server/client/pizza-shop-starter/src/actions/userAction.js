import axios from 'axios';
import swal from 'sweetalert';


export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST' })
    try {
        const res = await axios.post('/api/user/register', user)
        dispatch({ type: 'USER_REGISTER_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAIL', payload: error })
    }
}
export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' })
    try {
        const response = await axios.post('/api/user/login', user)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href = '/'
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAIL', payload: error })
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')

    window.location.href = '/login'
}


export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: 'GET_USERS_REQUEST' })
    try {
        const res = await axios.get('/api/user/getallusers')
        // console.log(res, " responseAction");
        dispatch({ type: 'GET_USERS_SUCCESS', payload: res.data })
    } catch (err) {
        dispatch({ type: 'GET_USERS_FAIL', payload: err })
        // console.log(err, "responseAction error");

    }
}

export const deleteUser = (userid) => async (dispatch) => {

    try {
        const res = await axios.post('/api/user/deletuser', { userid })
        // console.log(res, " responseAction");
        swal("Good job!", "User Deleted", "success")

        window.location.reload();
    } catch (err) {
        swal("Oops!", "Someting Wrong!", "error")
        // console.log(err, "responseAction error");

    }
}
