import React from 'react';
import {MainBox, TitleBox, Title, ContentBox, InputBox, TextOutput, SendButton} from './style.js';
import {connect} from 'react-redux';
import {init, move} from '../redux/actions.js';

class MainScreen extends React.Component{
    state = {
        input: ''
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    init = () => {
        this.props.init(this.props.key);
    }

    send = event => {
        event.preventDefault();
        this.props.move(this.state.input);
        this.setState({input:''});
    }

    render(){
        let output = '';
        let desc = '';
        if(this.props.loggedin){
            if(!this.props.initialized){
                this.init();
            }
            output = `Location:${this.props.title}`;
            desc =  `Description: ${this.props.desc}`;
        }else{
            output = "Please log in.";
        }
        return(
            <MainBox>
                <TitleBox>
                    <Title>
                        Main Screen
                    </Title>
                </TitleBox>
                <ContentBox>
                    <TextOutput>
                        {output} <br/>
                        {desc}
                    </TextOutput>
                    <InputBox
                        type='text'
                        placeholder='User input'
                        value={this.state.input}
                        name='input'
                        onChange={this.handleChange}
                    />
                    <SendButton onClick={this.send}>
                        Send
                    </SendButton>
                </ContentBox>
            </MainBox>
        )
    }
}

const mapStateToProps = state => ({
    loggedin: state.loggedin,
    key: state.key,
    title: state.title,
    desc: state.description,
    initialized: state.initialized
});

export default connect(mapStateToProps, {init, move})(MainScreen);