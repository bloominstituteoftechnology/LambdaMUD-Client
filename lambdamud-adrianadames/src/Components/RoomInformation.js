import React from 'react';
// import axios from 'axios';
// import Pusher from 'pusher-js';

const RoomInformation = props => {
    return (
        <div>
            <div>
                Room Title: {props.playerCurrentRoomTitle}
            </div>
            <div>
                {console.log("playerCurrentRoomDescription: ", props.playerCurrentRoomDescription)}
                Room Description: {props.playerCurrentRoomDescription}
            </div>

            {/* <div>
                Players in Room:
                {console.log(props.playerCurrentRoomPlayerNames)}
                <ul>
                    {props.playerCurrentRoomPlayerNames.map(player => {
                        return (
                            <li>
                                {player}
                            </li>) 
                    })}
                </ul>
            </div> */}
        </div>
    )
}

export default RoomInformation;






// // EXPERIMENT!
// class RoomInformation extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentRoomTitle: '',
//             currentRoomDescription: '',
//             playerCurrentRoomPlayerNames: []
//         }
//     }

//     componentDidMount() {
//         let token = localStorage.getItem('key')
//         let config = {
//         headers: {
//             Authorization: `Token ${token}`
//             }
//         }
//         console.log('config: ', config)
//         axios
//         // .get('https://lambdamud-adrianadames.herokuapp.com/api/adv/init/', config)
//             .get('http://localhost:8000/api/adv/init', config)
//             .then(res => {
//                 console.log('Server response: ', res)

//                 // this.setState({
//                 //   playerCurrentRoomTitle: res.data.title,
//                 //   playerCurrentRoomDescription: res.data.description,
//                 //   playerCurrentRoomPlayerNames: res.data.players,
//                 //   playerUUID: res.data.uuid,
//                 //   playerName: res.data.name
//                 // })

//                 // console.log('State:', this.state)

//                 // const PUSHER_SECRET = os.environ.get('PUSHER_SECRET')
//                 // const PUSHER_SECRET ='85cb33a7bf37eec33e16'

//                 const PUSHER_KEY='6efe28ed50121cb36c66'

//                 // const PUSHER_CLUSTER = os.environ.get('CLUSTER')
//                 const PUSHER_CLUSTER='us2'

//                 const socket = new Pusher(PUSHER_KEY, {
//                 cluster: PUSHER_CLUSTER,
//                 })
//                 console.log('socket: ', socket)

//                 const channel = socket.subscribe(`p-channel-${res.data.uuid}`);
//                 console.log('channel: ', channel)

//                 // channel.bind('sayEvent', this.saySubmitHandler)
//                 channel.bind('sayEvent', function(data) {
//                 alert(JSON.stringify(data));
//                 console.log(data)
//                 })
//                 channel.bind('broadcast', function(data) {
//                 alert(JSON.stringify(data));
//                 console.log(data['message'])
//                 })

//                 this.setState({
//                     playerCurrentRoomTitle: res.data.title,
//                     playerCurrentRoomDescription: res.data.description,
//                     playerCurrentRoomPlayerNames: res.data.players,
//                     // playerUUID: res.data.uuid,
//                     // playerName: res.data.name
//                 })
        
//                 console.log('State:', this.state)
//             })
//             .catch(err => {
//                 console.log('Axios failed: ', err.response)
//             })
//     }

//     render() {
//         return (
//             <div>
//                 PLAYERS IN THE ROOM
//                 {this.state.playerCurrentRoomPlayerNames.map(player => {
//                         return (
//                             <ul>
//                                 <li>
//                                     {player}
//                                 </li>
//                             </ul>
//                         )
//                     })
//                 }
//             </div>
//         )
//     }
// }
