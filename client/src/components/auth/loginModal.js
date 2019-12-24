import React,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
	Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
class LoginModal extends Component {
    state = {
        modal: false,
        email:"",
        password:"",
        msg:null
	};
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error:PropTypes.object.isRequired,
        login : PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error,isAuthenticated } =this.props;
        if(error !== prevProps.error){
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg:error.msg.msg})
            }else {
                this.setState({msg: null})
            }
        };
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }
    toggle = () =>{
        this.props.clearErrors();
        this.setState({
            modal:!this.state.modal
        });
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
        const {email ,password} = this.state;
        const user = {
            email,
            password
        };
        this.props.login(user)
       
    }
    render() {
        return(
            <div className = 'form'>
                {/* <NavLink onClick = {this.toggle} href = "#">Login</NavLink>

                <Modal isOpen= {this.state.modal} toggle= {this.toggle}>
                    <ModalHeader toggle= {this.toggle}> Login </ModalHeader>
                    <ModalBody>
                        {this.state.msg? <Alert color="danger">{this.state.msg}</Alert>:null}
                        
                    </ModalBody>
                </Modal> */}
                        <Form onSubmit ={ this.onSubmit }>
                            <FormGroup>
								<Label for = 'email'>Email</Label>
                                <Input 
                                onChange = {this.onChange}
                                name ="email"
                                type ="email"
                                id="email"
                                placeholder ="Email"/>
								<Label for = 'password'>Password</Label>
                                <Input 
                                onChange = {this.onChange}
                                name ="password"
                                type ="password"
                                id="password"
                                placeholder ="Password"/>
                                <Button color= 'dark' style ={{marginTop:'2rem' } }block>
                                Login</Button>
                            </FormGroup>
                        </Form>
                        <Link to ='/register'>Creat an account</Link>
            </div>
            
        )
    }
}
const mapStateToProps = state => ({
	isAuthenticated:state.auth.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps ,{ login,clearErrors })(LoginModal)