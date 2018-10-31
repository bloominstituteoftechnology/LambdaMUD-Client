import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {GameForm,GameFormHeader,GameFormMain,GameFormControls,GameFormTextSection,ActionButton,LogOutButton} from './GameComponents';

class Game extends React.Component{
    constructor(){
        super();
        this.state={
            actions:[]
        }
    }
    componentDidMount(){
        const token=localStorage.getItem('token');
        localStorage.setItem('savedPage','/main');
        axios.get('https://new-school-mud.herokuapp.com/api/adv/init',{
            headers:{
                Authorization:`Token ${token}`
                }
            })
            .then(res=>{
                const actions=this.state.actions.slice();
                actions.push(res.data);
                this.setState({actions:actions},()=>console.log(this.state.actions));
            })
            .catch(err=>console.log(err))
    }
    logout=()=>{
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    render(){
        return(
            <GameForm>
                <GameFormHeader>Adventure</GameFormHeader>
                <GameFormMain>
                    <GameFormTextSection>
                    </GameFormTextSection>
                    <GameFormControls>
                        <input/>
                        <ActionButton>Send</ActionButton>
                        <LogOutButton onClick={this.logout}>Log Out</LogOutButton>
                    </GameFormControls>
                </GameFormMain>
            </GameForm>
        )
    }
}
export default withRouter(Game);