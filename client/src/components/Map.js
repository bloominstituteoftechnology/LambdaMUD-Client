import React, { Component } from 'react'
import axios from 'axios'
export default class Map extends Component {
    state={
        div:[]    
    }

    mapping = () => {
        const max_x = 100;
        const max_y = 100;
        let x = 0;
        let y = 0;
        let cor = { x , y }
        for(let i=0; i< max_x; i++){
            for(let j=0; j<max_y; j++){
                x+=1
                y+=1
                return cor 
            }
        }

    }

    getRoom = () => {
        axios
        .get('__link__here__')
        .then(res => {
            //get room information here
            if(room.s_to||room.n_to||room.e_to||room.w_to > 0){
                div += 
            }
        })
    }


    renderDiv = (room) => {
        if(room){
            return div render
        }
        return null
    }
    
    render() {
        
        return (
            <div>
                From Map
            </div>
        )
    }
}






