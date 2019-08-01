import React, { Component } from 'react'
import axios from 'axios'
export default class Map extends Component {
    state = {
        grid:[]   
    }


    componentDidMount() {
        axios
            .get('https://f-troop-adventures.herokuapp.com/api/adv/rooms/')
            .then(res => {
                this.setState({ grid: res.data })
        })
        .catch(err => console.log(err))
    }
    
    handleClick = e => {
        const { result } = this.state.grid
        result.forEach(cv => {
            if(cv.e_to === cv.w_to){
                return(<div>{cv}</div>)
            } else if (cv.n_to===cv.s_to){
                return(<div>{cv}</div>)
            }
            
        })
    }




    render () {
        console.log('state ', this.state.grid.result)
        return(
            <div className="big_map">
                <button onClick={this.handleClick}>Map</button>
            </div>
        )
    }
}
