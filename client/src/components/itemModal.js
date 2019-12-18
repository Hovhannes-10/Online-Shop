import React,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from "../actions/itemsActions";

class ItemModal extends Component  {
    state = {
        modal: false,
        name: '',
        info:'',
        price:null,
        file:'',
    }
    toggle = () =>{
        this.setState({
            modal:!this.state.modal
        })
    }
    fileUpload = (e) => {
        this.setState({
            file:e.target.files[0],
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit = async e => {
        const formData =new FormData();
        formData.append('file', this.state.file);
        formData.append('name', this.state.name);
        formData.append('info', this.state.info);
        formData.append('price', this.state.price);
        e.preventDefault();
        this.props.addItem(formData);
        this.toggle();
    }
    render() {
        return(
            <div>
                <Button 
                    onClick = {this.toggle}
                    color = "danger"
                    style = {{marginBottom:"2rem"}}
                >AddItem</Button>
                <Modal isOpen= {this.state.modal} toggle= {this.toggle}>
                    <ModalHeader toggle= {this.toggle}> Add to items </ModalHeader>
                    <ModalBody>
                        <Form onSubmit ={ this.onSubmit } >
                            <FormGroup encType="multipart/form-data">
                                <Label for = 'name'>Name</Label>
                                <Input 
                                onChange = {this.onChange}
                                name ="name"
                                type ="text"
                                id="name"
                                placeholder ="name"/>
                                <Label for = 'price'>Name</Label>
                                <Input 
                                onChange = {this.onChange}
                                name ="price"
                                type ="text"
                                id="price"
                                placeholder ="Price"/>
                                <Label for = "info">Info</Label>
                                <Input 
                                onChange = {this.onChange}
                                type="textarea" 
                                name="info" 
                                id="info" 
                                placeholder= 'Info'/>
                                <Input 
                                onChange = {this.fileUpload}
                                name ="file"
                                type ="file"
                                id="file"
                                placeholder ="Add item to SoppingList"/>
                                <Button color= 'dark' style ={{marginTop:'2rem' } }block>
                                Add item</Button>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            
        )
    }
}
const mapStateToProps = state => ({
    item:state.item
})

export default connect(mapStateToProps ,{addItem})(ItemModal)