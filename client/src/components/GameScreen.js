import React, {Component} from 'react'; 

class GameScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            authorized: true
        }
    }

    componentDidMount = () => {
        if(!localStorage.getItem('token')){
            this.setState({
                authorized: false
            })
        }
    }

    logOutHandler = () => {
        localStorage.clear()
        this.props.history.push("/login")
    }

    render(){
        return(
            <div className = "game-screen">
                <h1>Adventure</h1>
                <button onClick = {this.logOutHandler} className = "btn btn-warning">Log Out</button>
            </div>
        )
    }
}

export default GameScreen; 