import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router";
import axios from 'axios';

const apiInit = "https://lambdamud-backend.herokuapp.com/api/adv/init/"; //get

class GamePlay extends Component {
    state = {
        token : "",
        mounted : false
    }

    componentDidMount () {
        const token = localStorage.getItem('jwt')
        const djangoToken = "Token " + token;
        const reqOptions = {
            headers: {
                Authorization: djangoToken, 
            },
        }
    
        const promise = axios.get(apiInit, reqOptions)
        promise
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response)
        })

    }
        
    signOut = () => {

        localStorage.removeItem('jwt')
        this.props.history.push("/login")
    }
    

    render () {
        console.log(this.props)
        let keys = []
        if(!this.props.location.state){
            keys = [];
        } else {
            keys = Object.keys(this.props.location.state)
        }
        
        if (keys.includes("token")){
            return (
                <div>
                    <div>
                        <h1>Inside the Game</h1>
                        {/* <Link to = "/login"> */}
                            <button onClick = {this.signOut} className = "web-btn">
                                <span className="char2 title-first">S</span>
                                <span className="char3 title-second">i</span>
                                <span className="char4 title-third">g</span>
                                <span className="char5 title-first">n</span>
                                <span className="char1 title-second">O</span>
                                <span className="char2 title-third">u</span>
                                <span className="char2 title-first">t</span>
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
            )   
        } else {
            return (
                <Redirect to={{
                    pathname: "/login",
                }}  
                />
            )
        }
    }
}

export default GamePlay; 