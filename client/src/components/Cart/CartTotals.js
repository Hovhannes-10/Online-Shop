import React,{Fragment, Component} from 'react';
import { Link } from "react-router-dom";

export default class CartTotals extends Component {
    render(){
        console.log(this.props);
        
        const { cart,total ,clearCart, removeInCart } = this.props.value;
        let cartTotals = cart.reduce((a, b) => a + b.total ,0)
        
        return  <Fragment>
                    <div className="container">
                        <div className="row">
                             <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                <Link to='/'>
                                    <button className="btn btn-outline-danger text-uppercase"
                                        onClick = {clearCart} 
                                    >clear cart</button>
                                </Link>   
                                <h5 className='mt-5'> 
                                total
                                    <span> $  {cartTotals}</span>
                                </h5>
                             </div>
                        </div>
                    </div>
    
    
                </Fragment>  
    }
  
}
