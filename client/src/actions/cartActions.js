import axios from 'axios';
import { ADD_TO_CART, REMOVE_IN_CART, INCREMENT, DECREMENT, DELETE_CART } from './type'

export const addToCart =id => dispatch =>{
    console.log("add")
    axios.put(`/api/items/${id}`,{
        headers: {
        "Content-Type":"multipart/form-data" 
        } 
    }).then(res =>{
         dispatch({
            type:ADD_TO_CART,
            payload:res.data
        })
    })  
}
export const increment = id =>dispatch => {
    console.log("increment")
    dispatch({
        type:INCREMENT,
        payload:id
    })
}
export const decrement = id =>dispatch => {
    console.log("decremnet")
    dispatch({
        type:DECREMENT,
        payload:id
    })
}
export const removeInCart = id => dispatch => {
    console.log("delete")
    axios.put(`/api/items/${id}`,{
        headers: {
        "Content-Type":"multipart/form-data" 
        } 
    }).then(res => { 
        dispatch({
            type:REMOVE_IN_CART,
            payload:id
        })
    })
}
export const clearCart = () => dispatch => {
    axios.post('api/items/remove_cart' , {
        headers :{
            "Content-Type" : "application/json"
        }
    })
    .then(res => {
        console.log(res.data)
        dispatch({
            type:DELETE_CART,
            payload:res.data
        })
    })
} 