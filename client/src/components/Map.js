import React, { Component } from 'react'
import axios from 'axios'
export default class Map extends Component {
    state = {
        results:'' 
    }


    componentDidMount() {
        axios
            .get('https://f-troop-adventures.herokuapp.com/api/adv/getmap/')
            .then(res => {
                // console.log(res.data)
                this.setState({
                    results : res.data
                })
        })
        .catch(err => console.log(err))
    }

    render () {
        // console.log('state ', this.state.results.map)
        return(
            <div dangerouslySetInnerHTML={{__html:this.state.results.map}}></div>
        )
    }
}
