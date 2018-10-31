import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {GameForm,GameFormHeader,GameFormMain,GameFormControls,GameFormTextSection,ActionButton,LogOutButton} from './GameComponents';
import GameAction from './GameActions';
import ScrollableFeed from 'react-scrollable-feed';

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
                this.setState({actions:actions});
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
    processAction=(e)=>{
        e.preventDefault();
        let action=this.state.action;
        const token=localStorage.getItem('token');
        if (action.toLowerCase()==='n'||action.toLowerCase()==='e'||action.toLowerCase()==='s'||action.toLowerCase()==='w') {
            this.move(action,token);
        } else if (action.split(' ')[0].toLowerCase()==='say'){
            action=action.split(' ');
            this.say(action.slice(1).join(' '),token)
        } else {
            alert(`${action} is not a valid command.`)
            this.setState({action:''})
        }
    }
    say=(message,token)=>{
        axios.post('https://new-school-mud.herokuapp.com/api/adv/say',
            {"message":message},{
            headers:{
                Authorization:`Token ${token}`
            }
            }
        )
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    move=(action,token)=>{
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
                    this.setState({actions:actions,action:''})
                } else {
                    alert("You cannot move that way.");
                    this.setState({action:''})
                }
            })
            .catch(err=>console.log(err))
        } 
    render(){
        return(
            <GameForm onSubmit={this.processAction}>
                <GameFormHeader>Adventure</GameFormHeader>
                <GameFormMain>
                        <GameFormTextSection>
                            <ScrollableFeed forceScroll={true}>
                            {this.state.actions.length>0?
                                this.state.actions.map((e,i)=>{
                                    return <GameAction data={e} key={i}/>
                                })
                                :null
                            }
                            </ScrollableFeed>
                        </GameFormTextSection>
                    <GameFormControls>
                        <input type='text' placeholder='Enter an action.' value={this.state.action} name='action' onChange={this.handleInputChange}/>
                        <ActionButton type='submit'>Send</ActionButton>
                        <LogOutButton onClick={this.logout}>Log Out</LogOutButton>
                    </GameFormControls>
                </GameFormMain>
            </GameForm>
        )
    }
}
export default withRouter(Game);