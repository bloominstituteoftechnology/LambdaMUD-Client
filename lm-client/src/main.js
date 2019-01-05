import React from 'react'
import Axios from 'axios';

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
        }
    }

    handleMove = (direction) => {
        Axios.post('https://jmcadvproject.herokuapp.com/api/adv/move',{headers:{Authorization:`Token ${window.localstorage.getItem('jwt')}`},
        data:{'direction':direction}
    })
    }

    handleSay = (message) => {
        Axios.post('https://jmcadvproject.herokuapp.com/api/adv/say',{headers:{Authorization:`Token ${window.localstorage.getItem('jwt')}`},
        data:{'message':message}
    })
    }
    
    handleChange = e => {
        this.setState({
            userInput: e.target.value
        })
    }

    handleSumbit = e => {
        e.preventDefault();
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
                    {this.state.title}
                    <div>
                        {this.state.description}

                    </div>
                </div>
            <form onSubmit = {this.handleSubmit}>
                <input placeholder = "enter command" 
                        type = "text"
                        id = "userInput" 
                        onChange = {this.handleChange}/>
                <button>Submit</button>
            </form>
            </div>
        )
    }
}