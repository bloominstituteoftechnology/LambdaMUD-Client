import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {GameForm,GameFormHeader,GameFormMain,GameFormControls,GameFormTextSection,ActionButton,LogOutButton} from './GameComponents';
import GameAction from './GameActions';

class Game extends React.Component{
    constructor(){
        super();
        this.state={
            actions:[],
            action:''
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
    handleInputChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    processAction=()=>{
        const action=this.state.action.toLowerCase();
        const token=localStorage.getItem('token');
        if (action==='n'||action==='e'||action==='s'||action==='w') {
            axios.post('https://new-school-mud.herokuapp.com/api/adv/move/',
                {"direction":action},{
                    headers:{
                        Authorization:`Token ${token}`
                    }
                })
                .then(res=>{
                    if (res.data.error_msg==='') {
                        const actions=this.state.actions.slice();
                        actions.push(res.data);
                        this.setState({actions:actions,action:''},()=>console.log(this.state.actions))
                    } else {
                        alert("You cannot move that way.");
                        this.setState({action:''})
                    }
                })
                .catch(err=>console.log(err))
        } else {
            alert(`${action} is not a valid command.`)
            this.setState({action:''})
        }
    }
    render(){
        return(
            <GameForm>
                <GameFormHeader>Adventure</GameFormHeader>
                <GameFormMain>
                    <GameFormTextSection>
                        {this.state.actions.length>0?
                            this.state.actions.map((e,i)=>{
                                return <GameAction data={e} key={i}/>
                            })
                            :null
                        }
                    </GameFormTextSection>
                    <GameFormControls>
                        <input type='text' placeholder='Enter an action.' value={this.state.action} name='action' onChange={this.handleInputChange}/>
                        <ActionButton onClick={this.processAction}>Send</ActionButton>
                        <LogOutButton onClick={this.logout}>Log Out</LogOutButton>
                    </GameFormControls>
                </GameFormMain>
            </GameForm>
        )
    }
}
export default withRouter(Game);