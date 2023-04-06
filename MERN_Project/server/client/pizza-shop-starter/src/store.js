import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { getAllPizzaReducer,addPizzaReducer ,getPizzaByIdReducer,updatePizzaBIdReducer} from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducer'
import { registerUserReducer,loginUserReducer ,getAllUsersReducer} from './reducers/userReducer'
import {placeOrderReducer,getUserOrdersReducer,allUserOrdersReducer} from './reducers/orderReducer'


 
const cartItem = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) :null;

const rootReducer = combineReducers({
    getAllPizzaReducer: getAllPizzaReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer:loginUserReducer,
    placeOrderReducer:placeOrderReducer,
    getUserOrdersReducer: getUserOrdersReducer,
    addPizzaReducer:addPizzaReducer,
    getPizzaByIdReducer:getPizzaByIdReducer,
    updatePizzaBIdReducer:updatePizzaBIdReducer,
    allUserOrdersReducer:allUserOrdersReducer,
    getAllUsersReducer:getAllUsersReducer,
})



const initalState = {
    cartReducer: {
        cartItems: cartItem,
    },
    loginUserReducer:{
        currentUser:currentUser
    }
}

const middleware = [thunk];

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;