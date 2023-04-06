export const getAllPizzaReducer = (state = { pizzas: [] }, action) => {
    switch (action.type) {
        case 'GET_PIZZAS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'GET_PIZZAS_SUCCESS':
            return {
                pizzas: action.payload,
                loading: false,
            }
        case 'GET_PIZZAS_FAIL':
            return {
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }

}
export const addPizzaReducer = (state = { pizzas: [] }, action) => {
    switch (action.type) {
        case 'ADD_PIZZAS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'ADD_PIZZAS_SUCCESS':
            return {
                success: true,
                loading: false,
            }
        case 'ADD_PIZZAS_FAIL':
            return {
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }

}
export const getPizzaByIdReducer = (state = { }, action) => {
    switch (action.type) {
        case 'GET_PIZZASBYID_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'GET_PIZZASBYID_SUCCESS':
            return {
                pizza: action.payload,
                loading: false,
            }
        case 'GET_PIZZASBYID_FAIL':
            return {
                error: action.payload,
                loading: false,
            }
        default:
            return state;
    }

}


export const  updatePizzaBIdReducer= (state = {  }, action) => {
    switch (action.type) {
        case 'UPDATE_PIZZASBYID_REQUEST':
            return {
                ...state,
                updateloading: true,
            }
        case 'UPDATE_PIZZASBYID_SUCCESS':
            return {
                updatesuccess: true,
                updateloading: false,
            }
        case 'UPDATE_PIZZASBYID_FAIL':
            return {
                updateerror: action.payload,
                updateloading: false,
            }
        default:
            return state;
    }

}