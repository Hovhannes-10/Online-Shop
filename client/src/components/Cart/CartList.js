import React from 'react'
import CartItem from './CartItem'
export default function CartList({value}) {
    
    // console.log(value);
    const {cart} = value
    return ( 
        <div>
            {cart.map(item => {
                return <CartItem  key = {item._id} cartItem={ item } value = { value }/>
            })}
        </div>
    )
}
