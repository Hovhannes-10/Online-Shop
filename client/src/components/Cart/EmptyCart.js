import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center">
                    <h1>Your cart is empty</h1>
                    <Link to ="/">
                        <button>back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
