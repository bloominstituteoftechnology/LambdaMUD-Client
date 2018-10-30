import React,{Fragment} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import img1 from '../../images/img1.jpg';

const Input = styled.input`
        width: 300px;
        height: 25px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid white;
`

const Form = styled.form`
        position: relative;
	height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
        padding: 7%;
`

const Button = styled.button`
        width: 100px;
        height: 25px;
        border-radius: 5px;
        border: 1px solid white;
	margin-bottom: 20px;
        &:hover {
        background: #303030;   //555
        color: white;
        border: 1px solid #303030;
        }
`

const Image =styled.img`
	width: 100%;
        position: absolute;
        right:0px;
        height: 100vh;
`

const Header=styled.h1`
	color: #303030
`

const Header4=styled.h4`
        color: #303030
`

const StyledLink=styled(Link)`
        text-decoration: none;
        color: black;
        font-size: 20px;
`

class Register extends React.Component {
constructor(props){
        super(props);
        this.state={
                username:"",
                password1:"",
		password2:"",
                status:0,
                message:""
        }
}

changeHandler=(event)=>{
        this.setState({[event.target.name]:event.target.value});
}


registerHandler=(event)=>{
        event.preventDefault();
        const {username, password1, password2} = this.state;
        const user = {username, password1, password2};

        axios.post('https://multi-user-game.herokuapp.com/api/registration/', user)
        .then(res=>{
                const key=res.data.key;
                localStorage.setItem('mud-token', key);
                this.setState({username:"", password1:"", password2:""});

        })
        .catch(err =>{
                //this.state.status=error.response.status;
                //this.state.message=error.response.data;
                console.log("error: couldn't login");
        });

}

render(){
        return(
        <Fragment>
	<Image src={img1} alt='background' />	
        <Form onSubmit={this.registerHandler}>
	<Header>Register</Header>
        <Input
        type='text'
        name='username'
	placeholder='Username'	
        value={this.state.username}
        onChange={this.changeHandler}
        />

        <Input
        type='password'
        name='password1'
	placeholder='Password'	
        value={this.state.password1}
        onChange={this.changeHandler}
        />
	
	<Input
        type='password'
        name='password2'
	placeholder='Confirm Password'
        value={this.state.password2}
        onChange={this.changeHandler}
        />

        <Button
        type='submit'>
        Register
        </Button>
	<Header4>Have an account?</Header4>
        <StyledLink to='/login'>Login</StyledLink>	
        </Form>
        </Fragment>
        );
}

}
export default Register;
