import {ADD_TO_CART ,GET_ITEMS ,REMOVE_IN_CART,INCREMENT , DECREMENT, DELETE_CART} from "../actions/type"
const initialState = {
    cart:[]
}

export default function (state = initialState ,action) {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload; 
            item.total = item.count * item.price;
            return { 
                ...state,
                cart:[item ,...state.cart]
            }
        case GET_ITEMS:
            return {
                ...state,
                cart:[...action.payload].filter(item => {
                    item.total = item.count * item.price;
                    return item.inCart !== false
                })
            } 
        case REMOVE_IN_CART:
            return { 
                ...state,
                cart:state.cart.filter(item => item._id !== action.payload)
            } 
        case DELETE_CART:
            return { 
                 ...state,
                 cart:[...action.payload]
            }
        case INCREMENT:    
            return {
                ...state,
                cart:state.cart.map(product =>{
                    if (product._id === action.payload) {
                        product.count++;
                        product.total = product.count * product.price;
                        const item = {...product };
                        return item
                    }
                    return product
                })
            } 
            case DECREMENT:    
            return {
                ...state,
                cart:state.cart.map(product =>{
                    if (product._id === action.payload) {
                        if (product.count>0) {
                            product.count--;
                            product.total = product.count * product.price;
                        }
                        const item = {...product } 
                        return item
                    }
                    return product
                })
            }           
        default:
            return state
    }
}