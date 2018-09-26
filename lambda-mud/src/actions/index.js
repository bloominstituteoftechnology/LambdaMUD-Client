import axios from 'axios'
import Pusher from 'pusher-js'

export const initialize = () => {
    var pusher = new Pusher('edd377db6931e48605bb', {
        cluster: 'us2',
        forceTLS: true
      })

    let key = 'Token ' + localStorage.getItem('key')

    const request = axios
      .get('https://lambda-adv-mud.herokuapp.com/api/adv/init', {
        headers: {
          "Authorization": key
        }
      })

    return (dispatch) => {
        dispatch({type: 'INITIALIZING'})
        request.then(response => {
            dispatch({type: 'INITIALIZED', payload: response.data})
            let channelString = 'p-channel-' + response.data.uuid
            var channel = pusher.subscribe(channelString)
              channel.bind('broadcast', function(data) {
                console.log('DATA', JSON.stringify(data))
                alert(data.message);
              })
        }).catch(error => {
            dispatch({type: 'ERROR', payload: error})
        })
    }
}

export const move = (e) => {
  const direction = e.target.getAttribute('direction')
  const token = 'Token ' + localStorage.getItem('key')
  const request = axios.post('https://lambda-adv-mud.herokuapp.com/api/adv/move/', 
    {"direction": direction}, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    })

  return (dispatch) => {
    request.then(response => {
      dispatch({type: 'MOVE', payload: response.data})
    })
    .catch(error => {
      dispatch({type: 'ERROR', payload: error})
    })
  }
}