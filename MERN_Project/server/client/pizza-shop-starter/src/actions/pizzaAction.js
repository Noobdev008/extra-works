import axios from 'axios';
import swal from 'sweetalert';

export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: 'GET_PIZZAS_REQUEST' })
    try {
        const res = await axios.get('/api/pizzas/getAllPizzas')
        console.log(res, " responseAction");
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: res.data })
    } catch (err) {
        dispatch({ type: 'GET_PIZZAS_FAIL', payload: err })
        console.log(err, "responseAction error");

    }
}

export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: 'ADD_PIZZAS_REQUEST' })
    try {
        const res = await axios.post('/api/pizzas/addpizzas', { pizza })
        console.log(res, " responseAction");
        dispatch({ type: 'ADD_PIZZAS_SUCCESS', payload: res.data })
    } catch (err) {
        dispatch({ type: 'ADD_PIZZAS_FAIL', payload: err })
        console.log(err, "responseAction error");

    }
}

export const getPizzaById = (pizzaId) => async (dispatch) => {
    dispatch({ type: 'GET_PIZZASBYID_REQUEST' })
    try {
        const res = await axios.post('/api/pizzas/getpizzabyid', { pizzaId })
        console.log(res, " responseAction");
        dispatch({ type: 'GET_PIZZASBYID_SUCCESS', payload: res.data })
    } catch (err) {
        dispatch({ type: 'GET_PIZZASBYID_FAIL', payload: err })
        console.log(err, "responseAction error");

    }
}


export const updatePizza = (updatedPizza) => async (dispatch) => {
    dispatch({ type: 'UPDATE_PIZZASBYID_REQUEST' })
    try {
        const res = await axios.post('/api/pizzas/updatepizza', { updatedPizza })
        console.log(res, " responseAction");
        dispatch({ type: 'UPDATE_PIZZASBYID_SUCCESS', payload: res.data })
        window.location.href = '/admin/pizzalist'
    } catch (err) {
        dispatch({ type: 'UPDATE_PIZZASBYID_FAIL', payload: err })
        console.log(err, "responseAction error");

    }
}

export const deletePizza = (pizzaId) => async (dispatch) => {

    try {
        const res = await axios.post('/api/pizzas/deletepizza', { pizzaId })
        console.log(res, " responseAction");
        swal("Good job!", "Pizza Deleted", "success")

        window.location.href = '/admin/pizzalist'
    } catch (err) {
        swal("Oops!", "Someting Wrong!", "error")
        console.log(err, "responseAction error");

    }
}


export const filterpizza = (searchkey, catagory) => async (dispatch) => {
    let filteredPizza;
    dispatch({
        type: 'GET_PIZZAS_REQUEST'
    })
    try {
        const res = await axios.get('/api/pizzas/getAllPizzas')
        filteredPizza = res.data.filter(pizza => pizza.name.toLowerCase().includes(searchkey))
        if (catagory !== 'all') {
            filteredPizza = res.data.filter(pizza => pizza.category.toLowerCase() === catagory)
        }
        dispatch({
            type: 'GET_PIZZAS_SUCCESS',
            payload: filteredPizza,
        })

    } catch (error) {
        dispatch({
            type: 'GET_PIZZAS_FAIL',
            payload: error
        })
    }
}