import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemsActions';
import { addToCart } from '../actions/cartActions';
import { Link } from 'react-router-dom'
import PropTayps from "prop-types";

 class Detalis extends Component {

    render() {
        const {item} = this.props
        if(!item){
            return <div>loading...</div> 
        }

        console.log(this.props);
        const { _id, name, img, price, info,inCart} = item
        return (
            <Fragment>
                <div className="container ry-5">
                <div className="row">
                        <div className="col-10 mx-auto text-center text-slanted my-5">
                            <h1>{item.name }</h1> 
                        </div>
                </div>
                <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3 "> 
                            <img src={img} className="img-fluid" alt="product" />
                        </div>
                        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                            <h2>model : { name }</h2>
                            <h4>
                                <strong>
                                    price: <span>$</span>
                                    {price}
                                </strong>
                            </h4>
                                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                    some info about product:
                                </p>
                                <p className="text-muted lead"> { info }</p>
                            <div>
                                <Link to="/">
                                <button className="button" style={{color:"#dc3545"}}>
                                back 
                                </button>
                                </Link>
                                <button className="button" style={{color:"#dc3545"}} onClick = {this.props.addToCart.bind(this , _id)}
                                disabled ={ inCart ? true:false}
                                >
                                    { inCart ? " inCart" : "Add to cart" } 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
Detalis.PropTayps = {
    addToCart: PropTayps.func.isRequired,
}

const  mapStateToProps = (state ,props) => ({
    item: state.item.items.find(item => item._id === props.match.params.id)
})
export default  connect(mapStateToProps, {getItems ,addToCart} )(Detalis)