import axios from 'axios';

export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' })
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;
    // console.log(currentUser , " curunrt " , cartItems , " carttItem ")
    try {
        const res = await axios.post('/api/order/placeorder', { token, subTotal, currentUser, cartItems })
        dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        console.log(res, " res");
    } catch (error) {
        console.log(error, " error");
        dispatch({ type: 'PLACE_ORDER_FAIL', payload: error });

    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
        type: 'USER_ORDER_REQUEST',
    })
    try {
        let res = await axios.post('api/order/getuserorder', { userid: currentUser._id })
        console.log(res, " resgetUserOrder");
        dispatch({
            type: 'USER_ORDER_SUCCESS',
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: 'USER_ORDER_FAIL',
            payload: error
        })
    }
}

export const getAllOrders = () => async (dispatch, getState) => {
    // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
        type: 'ALL_ORDER_REQUEST',
    })
    try {
        let res = await axios.get('/api/order/alluserorder')
        // console.log(res, " resgetUserOrder");
        dispatch({
            type: 'ALL_ORDER_SUCCESS',
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: 'ALL_ORDER_FAIL',
            payload: error
        })
    }
}

export const deliverOrder = (orderid) => async (dispatch, getState) => {
    // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
        type: 'GET_ALL_ORDER_REQUEST',
    })
    try {
        let res = await axios.post('/api/order/deliverorder', { orderid })
        let orders = await axios.get('/api/order/alluserorder')
        // console.log(res, " resgetUserOrder");
        dispatch({
            type: 'GET_ALL_ORDER_SUCCESS',
            payload: orders.data,
        })
        window.location.href = 'admin/orderlist'
    } catch (error) {
        dispatch({
            type: 'GET_ALL_ORDER_FAIL',
            payload: error
        })
    }
}