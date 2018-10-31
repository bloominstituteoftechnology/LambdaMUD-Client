import React from 'react';
import axios from 'axios';

class Game extends React.Component{
    componentDidMount(){
        const token=localStorage.getItem('token');
        axios.get('https://new-school-mud.herokuapp.com/api/adv/init',{
            'headers':{
                'Authorization':`Token ${token}`
                }
            })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    render(){
        return(
            <div></div>
        )
    }
}
export default Game;