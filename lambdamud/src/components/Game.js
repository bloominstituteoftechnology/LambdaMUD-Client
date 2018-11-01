import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {GameForm,GameFormHeader,GameFormMain,GameFormControls,GameFormTextSection,ActionButton,LogOutButton} from './GameComponents';
import GameAction from './GameActions';
import ScrollableFeed from 'react-scrollable-feed';
import Pusher from 'pusher-js';
//file creates game view on client side, subscribes to a pusher channel listening for messages and displaying those to user as well as processing api calls to server and displaying responses//
class Game extends React.Component{
    constructor(){
        super();
        this.state={
            actions:[],
            action:'',
            pusher:''
        }
    }
    componentDidMount(){
        const token=localStorage.getItem('token');
        localStorage.setItem('savedPage','/main');
        const pusher=new Pusher("9df5e9e47d22bf2eb894", {
            cluster: "us2"
        });
        axios.get('https://new-school-mud.herokuapp.com/api/adv/init',{
            headers:{
                Authorization:`Token ${token}`
                }
            })
            .then(res=>{
                const actions=this.state.actions.slice();
                actions.push(res.data);
                const channel=pusher.subscribe(`p-channel-${res.data.uuid}`);
                channel.bind('broadcast',function(data){
                    alert(data.message);
                })
                this.setState({actions:actions,pusher:pusher});
            })
            .catch(err=>console.log(err))
    }
    componentWillUnmount(){
        this.state.pusher.unsubscribe(`p-channel-${this.state.actions[0].uuid}`);
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
            {"message":`, '${message}'`},{
            headers:{
                Authorization:`Token ${token}`
            }
            }
        )
        .then(res=>this.setState({action:''}))
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