import React ,{ Component,Fragment } from 'react';
import Product from './Product'
import Title from './Title'
// import {ListGroup,ListGroupItem ,Container , Button} from 'reactstrap' ;
import { connect } from 'react-redux';
import { getItems,deleteItem } from '../actions/itemsActions';
import PropTayps from "prop-types"

class ShoppingList extends Component {
    // componentDidMount()  {
    //     this.props.getItems();  
    // }
    render() {   
        console.log(this.props.item);
        const { items } = this.props.item;

        return(
            <Fragment>
                <div className = "py-5">
                    <div className="container">
                        <Title  name='our' title = 'products'/>
                        <div className="row">
                            {items.map(item =>{
                            return<Product key={ item._id } product ={ item }/>
                         })}
                        </div>
                    </div>
                </div>
            </Fragment>
            

        )
    }
}
ShoppingList.propTayps = {
    item: PropTayps.object.isRequired,
    getItems: PropTayps.func.isRequired,
}
const  mapStateToProps = (state) => ({
    item: state.item,
    cart: state.cart
})
export default connect(mapStateToProps , { getItems, deleteItem }) (ShoppingList)