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
        /*when component mounts a call to the server's /api/adv/init route is made the response is pushed into the state's actions array
        a new Pusher object is also made and subscribed to a channel and bound to broadcast to listen for messages the state is changed 
        to account for the actions array and pusher object*/
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
        //when component unmounts the pusher instance in state will unsubscribe from it's channel//
        const pusher=this.state.pusher;
        pusher.unsubscribe(`p-channel-${this.state.actions[0].uuid}`);
    }
    logout=()=>{
        //when user clicks on Log Out button the token variable in localStorage will be removed and user will be redirected to /login page//
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    handleInputChange=(e)=>{
        //handles state update each time an input field's value changes event obj is passed in as parameter//
        this.setState({[e.target.name]:e.target.value});
    }
    processAction=(e)=>{
        /*when user clicks on send button, event object is passed in as parameter and the value of the action in state is processed
        to check whether it is a valid input if it is a valid input another function is invoked to handle it else user is alerted that 
        their command is invalid.
        */
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
        //accepts a message and token as parameters then makes an api call to the servers /api/adv/say route then resets value of action to ''//
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
    move=(direction,token)=>{
        /*accepts an direction and token as parameters then makes an api call to the servers /api/adv/move route
        if successful actions array has the data pushed into it and action is reset to '' else user is alerted
        that they cannot move that way.
        */
        axios.post('https://new-school-mud.herokuapp.com/api/adv/move/',
            {"direction":direction},{
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
        //renders game view//
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