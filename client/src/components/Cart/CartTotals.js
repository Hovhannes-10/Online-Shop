import React,{Fragment, Component} from 'react';
import { Link } from "react-router-dom";
import PayPalButton from './PayPalButton'

export default class CartTotals extends Component {
    render(){
        console.log(this.props);
        
        const { cart,total ,clearCart, removeInCart } = this.props.value;
        let cartPriceTotals = cart.reduce((a, b) => a + b.total ,0)
        let cartCountTotals = cart.reduce((a,b)=> a + b.count ,0)
        
        return  <Fragment>
                    <div className="container">
                        <div className="row">
                             <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                <Link to='/'>
                                    <button className="btn btn-outline-danger text-uppercase"
                                        onClick = {clearCart} 
                                    >clear cart</button>
                                </Link>   
                                <h4 className='mt-4'> total</h4>
                                <h6><span>total price   {cartPriceTotals} $</span></h6>
                                <h6><span>total count { cartCountTotals} </span></h6>
                                <PayPalButton history ={this.props.history} />    
                             </div>
                        </div>
                    </div>
    
    
                </Fragment>  
    }
  
}
