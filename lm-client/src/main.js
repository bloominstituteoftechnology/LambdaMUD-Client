import React from 'react';
import Axios from 'axios';
import Pusher from 'pusher-js';

export default class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            players:[],
            name:'',
            title:'',
            uuid:'',
            description:'',
            feed:[],
            userInput: ''
        }
    }
    componentDidMount(){
        if(localStorage.getItem('jwt')){
            Axios.get(
                'https://jmcadvproject.herokuapp.com/api/adv/init',{headers:{Authorization:`Token ${localStorage.getItem('jwt')}`}}
            ).then(res => {
                const {players,name,title,uuid,description} = res.data
                console.log(res.data)
                this.setState({players,name,title,uuid,description})
            })
        if(this.state.uuid){
            this.pusher = new Pusher("a4be147ddbc64c438519", {
                cluster:"us2"
            })
            this.channel = this.pusher.subscribe(`p-channel-${this.state.uuid}`)
            this.channel.bind('broadcast',this.updateFeed)
        }
        }
    }

    handleMove = (direction) => {
        console.log('handleMove called')
        Axios.post('https://jmcadvproject.herokuapp.com/api/adv/move',{headers:{Authorization:`Token ${localStorage.getItem('jwt')}`},
        data:{'direction':direction}
    }).then(res => {this.setState({title:res.title,description:res.description})})
    }
    updateFeed = update => {
        const newFeed = this.state.feed.concat(update.message)
        this.setState({feed:newFeed})
    }
    handleSay = (message) => {
        console.log('handlesay called')
        Axios.post('https://jmcadvproject.herokuapp.com/api/adv/say',{headers:{Authorization:`Token ${localStorage.getItem('jwt')}`},
        data:{'message':message}
    })
    }
    
    handleChange = (e) => {
        this.setState({
            userInput: e.target.value
        })
    }

    handleClick = (e) => {
        let split = this.state.userInput.split(' ')
        if (split[0] === 'move'){
            this.handleMove(split[1])
        }
        if (split[0] === 'say'){
            this.handleSay(this.state.userInput.slice(4))
        }
    }

    
    render() {
        return (
            <div className = "main-page-container">
            <h3>Adv</h3>
                <div className ="user-output">
                    <h2>{this.state.title}</h2>
                    <div>
                        {this.state.description}
                        {
                            this.state.feed.forEach( e => {
                                return  <div> {e} </div>
                            }
                               
                            )
                        }
                    </div>
                </div>
            
                <input placeholder = "enter command" 
                        type = "text"
                        value = {this.state.userInput}
                        id = "userInput" 
                        onChange = {this.handleChange}/>
                <button onClick = {() => this.handleClick}> Submit </button>
           
            </div>
        )
    }
}