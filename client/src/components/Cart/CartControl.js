import React, { Component } from 'react';
import Login from '../auth/Login';

export default class CartControl extends Component {
    
    render() {
        return (
            <div className = "form">
                <h3 className="mb-5 mx-auto">pleas login in order to see your cart</h3>
                <Login/>
            </div>
        )
    }
}
