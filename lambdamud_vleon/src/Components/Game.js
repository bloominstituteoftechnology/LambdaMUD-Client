import React from "react";
import axios from "axios";

const url = "https://lambdamudvleon.herokuapp.com/api/adv/init/"

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameObj: {},        
            direction: "",
            say: "",
            token: ""
        };
    };

    getToken = () => {
        let token = localStorage.getItem("Token");
        return token;
    }



    componentDidMount() {
        const token = this.getToken();
        if (token){
            let config = {
                headers: {
                    Authorization: `Token ${token}`,
                }
            }
            axios.get(url, config).then(response => {
                this.setState({gameObj: response.data})
            })
            .catch(error => console.log("Error: ", error));
        }

    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    userDirection = event => {
        event.preventDefault();
        const direction = {
            direction: this.state.direction
        };
        axios.post(url, direction).then(response => {
            this.setState ({

            })
        })
    }

    render() {
        const { title, description } = this.state.gameObj;
        return (
            <div className="game-container">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        )
    }

}

export default Game;