import React,{ Component, Fragment } from "react";
import { Link } from "react-router-dom"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from './auth/Logout';

class AppNavbar extends Component {
    state = {
        isOpen : false
    }
    static propTypes = {
        auth:PropTypes.object.isRequired
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    render() { 
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className = "navbar-text">
                        <strong className = "nav-item">{user ? user.name : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                   <Logout/>
                </NavItem>
            </Fragment>
        )
        const guestLink =(
            <Fragment>
                <NavItem >
                    <Link to = '/register'> 
                        <button className = 'button'>register</button>
                     </Link>
                </NavItem>
                <NavItem className="nav-item">
                    <Link to = '/login'>
                        <button className = 'button'>login</button> 
                    </Link>
                </NavItem>
            </Fragment>
        )
        return(
            <div>
                <Navbar color ="danger" dark expand ="sm" className="mb-5">
                    <Container>
                        <NavbarBrand tag="span"><Link to = '/' className='nav-item'> Soping List</Link></NavbarBrand>
                        <NavbarToggler onClick = {this.toggle}></NavbarToggler>
                        <Collapse  isOpen ={this.state.isOpen} navbar>
                            <Nav className = "ml-auto align-items-center" navbar>
                                <NavItem >  
                                    <Link to = "/card">
                                        <button className = 'button'>
                                            <span className = "mr-2">
                                                <i className = 'fas fa-cart-plus'></i>
                                            </span>
                                            My Card
                                        </button>
                                    </Link> 
                                </NavItem>
                                {isAuthenticated ? authLinks :guestLink}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>  
            </div>
        )
    }
}

const MapStateToProps = state => ({
    auth:state.auth    
})
export default connect(MapStateToProps , null)(AppNavbar)