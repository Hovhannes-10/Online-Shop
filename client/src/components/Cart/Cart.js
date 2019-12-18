import React, { Component ,Fragment} from 'react';
import {connect} from 'react-redux';
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import CartList from './CartList'
import CartTotals from './CartTotals'
import {getItems} from '../../actions/itemsActions'
import {increment, decrement, removeInCart,clearCart } from '../../actions/cartActions'

export  class Cart extends Component {

    render() {
        console.log(this.props)
        const value = this.props
        const { cart } = value
        
        if (cart.length >0) {
            return (
                <Fragment>
                    <Title name="Your" title="Cart" />
                    <CartColumns />
                    <CartList value={ value }/>
                    <CartTotals value = { value }/>
                </Fragment>
            )
        }else {
            return <EmptyCart />
        }
    }
}
const  mapStateToProps = (state) => ({
    cart: state.cart.cart,
    total: state.cart.total
})
export default connect(mapStateToProps ,{getItems ,increment, decrement, removeInCart , clearCart} ) (Cart)