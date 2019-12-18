import React, { Component } from 'react';
import  styled from "styled-components";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTayps from "prop-types"
import { addToCart } from '../actions/cartActions';
import { getItems } from '../actions/itemsActions'

export class Product extends Component {
    componentDidMount (){
        this.props.getItems()
    }
    onClick = id => { 
      this.props.addToCart(id);
    }  
    render() {
        // console.log(this.props) 
        const product = this.props.product
        const { _id, name, img, price, inCart} = product
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3"> 
                <div className="card">
                    <div className="img-container p-5">
                        <Link to = {`/detalis/${_id}`}>
                            <img src = { img } alt="product" className="card-img-top" style = {{width:'100%' ,height: '10rem'}} title="click for more detalis"/> 
                        </Link>
                        <button 
                            className="cart-btn"
                            disabled={inCart? true: false }
                            onClick = {this.onClick.bind(this ,_id)}
                        >
                            {inCart ? (
                                    <p className="text-capitalize mb-0" disabled>
                                        {" "}
                                        inCart
                                    </p>
                                ) :(
                                   <span> add to cart<i className="fas fa-cart-plus" /></span> 
                                )} 
                        </button>                                             
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">{ name }</p>
                        <h5 className="font-italic mb-0">
                            <span className="mr-1">$</span>
                            { price } 
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}
Product.propTayps = {
    item: PropTayps.object.isRequired,
    addToCart: PropTayps.func.isRequired,
    getItems: PropTayps.func.isRequired
}
const  mapStateToProps = (state) => ({
    item: state.item
})
export default connect(mapStateToProps , { addToCart,getItems}) (Product)


const ProductWrapper = styled.div`
    .card {
        border-color: transparent;
        transition:all 0.5s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition:all 1s linear;
    }
    &:hover {
        .card{
            border: 0.04rem solid rgba(0, 0, 0, 0.4);
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.4);
        }
    }
    .card-footer {
        background : rgba(247, 247, 247);
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .card-img-top {
        transition:all 1s linear;
    }
    img-container:hover .card-img-top {
        transform: scale(0.5);
    }
    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background:#e80c21;
        width:100%;
        border: none;
        color: #f8f9fa
        font-size: 1.2rem;
        // border-radius: 0.5rem 0 0 0;
        transform: translate(0 , 100%);
        transition: all 1s linear;
    }
    .img-container:hover .cart-btn {
        transform: translate(0,0);
    }
`;