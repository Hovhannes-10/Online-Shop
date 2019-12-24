import axios from 'axios'
import { GET_ITEMS,ADD_ITEM,DELETE_ITEM,LOADING_ITEMS } from './type'

export  const getItems = () => dispatch =>{
    dispatch(setItemsLoading());
    axios.get('/api/items')
    .then(res => dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
}
export  const addItem = item =>async dispatch => {
    await axios.post('/api/items', item , { 
        headers: {
            "Content-Type":"multipart/form-data" 
        } 
    }).then(res => {
        dispatch({
            type:ADD_ITEM,
            payload: res.data
        })
    })
}
export  const deleteItem = id => dispatch =>{
    axios.delete(`/api/items/${id}`).then(res => {
        dispatch({
            type:DELETE_ITEM,
            payload:id
        })
    })
}
export const setItemsLoading = () =>{
    return{
        type:LOADING_ITEMS
    }
}