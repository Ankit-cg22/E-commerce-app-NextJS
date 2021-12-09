// react context
import Cookies from 'js-cookie'
import { createContext , useReducer ,useContext } from "react";

export const Store = createContext();
const initialState = {
    darkMode :false,
    cart : {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [] , 
        shippingData : Cookies.get('shippingData') ? JSON.parse(JSON.stringify(Cookies.get('shippingData'))) : [],
        paymentMethod : Cookies.get('paymentMethod') ? JSON.parse(JSON.stringify(Cookies.get('paymentMethod'))) : [],
    },
    userInfo :  Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
        
    
}

function reducer(state, action){
    switch(action.type){
        case 'CART_ADD_PRODUCT':{
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(item => item._id === newItem._id)
            const cartItems = existingItem ? 
                            state.cart.cartItems.map((item) => item.name === existingItem.name ? newItem: item) 
                            : [...state.cart.cartItems , newItem]
            Cookies.set('cartItems' , JSON.stringify(cartItems))
            return {...state, cart : {...state.cart , cartItems}}
        };
        case 'CART_REMOVE_PRODUCT': {
            const deleteItem = action.payload
            const cartItems = state.cart.cartItems.filter(item => item._id !== deleteItem._id)
            Cookies.set('cartItems' , JSON.stringify(cartItems))
            return {...state, cart : {...state.cart , cartItems}}

        };
        case 'USER_LOGIN':{
            
            return {...state , userInfo : action.payload}
        };
        case 'USER_LOGOUT':{
            
            return {...state , userInfo : null , cart : {cartItems:[]}}
        };

        case "SAVE_SHIPPING_DATA":{
            return {...state , cart : {...state.cart , shippingData : action.payload}}
        };
        case 'SAVE_PAYMENT_METHOD':{
            return {
                ...state,
                cart : {...state.cart , paymentMethod : action.payload}
            }
        }
    }
}

export function StoreProvider(props){
    const [state , dispatch] = useReducer(reducer , initialState)
    const value ={state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}