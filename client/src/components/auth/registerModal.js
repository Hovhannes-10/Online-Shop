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
import { Redirect } from 'react-router-dom'
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions"
import PropTypes from "prop-types"
class RegisterModal extends Component {
    state = {
        modal: false,
        name: "",
        email:"",
        password:"",
        msg:null
	};
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error:PropTypes.object.isRequired,
        register : PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error,isAuthenticated } =this.props;
        if(error !== prevProps.error){
            if (error.id === 'REGISTER_FAIL') {
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
        const { name, email, password } = this.state;
        const newUser = {
            name,
            email,
            password
        }
       this.props.register(newUser)
       
    }
    render() {
        console.log(this.state.msg)
        return(
            <div className = "form">
                {this.state.msg? <Alert color="danger">{this.state.msg}</Alert>:null}
                <Form onSubmit ={ this.onSubmit }>
                            <FormGroup>
                                <Label for = 'name'>Name</Label>
                                <Input 
                                onChange = {this.onChange}
                                name ="name"
                                type ="text"
                                id="name"
                                placeholder ="Name"/>
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
                                Register</Button>
                                {this.props.isAuthenticated? <Redirect to='/'/>: null } 
                            </FormGroup>
                        </Form>
            </div>
            
        )
    }
}
const mapStateToProps = state => ({
	isAuthenticated:state.auth.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps ,{ register,clearErrors })(RegisterModal)