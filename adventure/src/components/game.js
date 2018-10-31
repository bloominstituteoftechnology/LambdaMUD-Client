import axios from 'axios';


const url = 'https://adventuregame-app.herokuapp.com'

class GameView extends Component {
    constructor() {
        super();
        this.state = {
            uuid: '',
            name: '',
            title: '',
            description: '',
            players: [],
            messages: [],
            input: '', 
            direction: '',
        };
    }

componentDidMount() {
    this.handleData();
}

handleData = () => {
    const header = {
      headers: {
        authorization: `TOKEN ${localStorage.getItem('token')}`
      }
    };

    axios
    .get(`${url}/api/game`, header)
    .then(response =>{
      console.log(response)
      this.setState(response.data)
      console.log(this.state)
    })
    .catch(error => {console.log(error)
    })
  }


}
export default GameView;