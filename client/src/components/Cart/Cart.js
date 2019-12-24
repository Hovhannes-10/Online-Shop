import React, { Component ,Fragment} from 'react';
import {connect} from 'react-redux';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';
import  CartControl  from './CartControl'
import {getItems} from '../../actions/itemsActions';
import {increment, decrement, removeInCart,clearCart } from '../../actions/cartActions';
import PropTypes from 'prop-types'


export  class Cart extends Component {
    static propTypes = {
        auth:PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const value = this.props
        const { cart } = value
        if ( isAuthenticated ) {
            if (cart.length > 0) {
                return (
                    <Fragment>
                        <Title name="Your" title="Cart" />
                        <CartColumns />
                        <CartList value={ value }/>
                        <CartTotals value = { value } history = { this.props.history }/>
                    </Fragment>
                )
            }else {
                return <EmptyCart />
            }
        } else {
           return <CartControl/>
        }
        
    }
}
const  mapStateToProps = (state) => ({
    cart: state.cart.cart,
    total: state.cart.total,
    auth:state.auth
})
export default connect(mapStateToProps ,{getItems ,increment, decrement, removeInCart , clearCart} ) (Cart)