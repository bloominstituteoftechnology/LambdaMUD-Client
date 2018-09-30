import React, { Component } from 'react';
import helpers from '../../helpers/scripts'
import axios from 'axios'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Card, CardContent, CardHeader, Typography} from '@material-ui/core/';
import Console from '../Console'
import '../../styles/home.css'
import Pusher from 'pusher-js'

const hkurl = helpers.hkurl

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    marginTop: '20px',
  },
  home: {
    
  },
  text:{
    color: '#00FF41',
    marginTop:'2px'
    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  commandInput: {
    outline: 'none !important',
    width: '100%',
    color: '#00FF41',
    backgroundColor: 'black',
    border: 'none',
    '&::placeholder': {
      color:'#00FF41'
    },
    '&input:focused': {
      outline: 'none'
    },
    '&::before' : {
      content: 'CC'
    },
    fontSize:'1.1em',
    paddingLeft: '4px',
   },
  button: {
     margin: theme.spacing.unit,
   },
   input: {
     display: 'none',

   },
   form:{
      display: 'flex',
      // flexDirection: 'column',
      justifyContent: 'left',
      backgroundColor: '#0D0208',
      marginLeft: '4px',
      borderRadius: '4px'
      // alignItems: 'center'
   },
});

const validateCommand = helpers.validateCommand
const serverUrl = helpers.hkurl

class Home extends Component {
  //pass log to Console, maxLogSize is changed depending on media query
  //command is given by user and sent to server
  //players is used for sidebar or room inventory?
  constructor(){
    super()
    this.state = {
      name: '',
      log: [],
      lastResponse: ``,
      command: '',
      maxLogSize: 4,
      uuid: '',
      players:[],
    }
  }

  componentDidMount = () => {
   /* props.init = axios /init response.data: 
        {"uuid": "c3ee7f04-5137-427e-8591-7fcf0557dd7b",
        "name": "testuser", "title": "Outside Cave Entrance",
        "description": "North of you, the cave mount beckons", "players": []} */
    if(this.props && this.props.init){
      //props exist, set state
      const init = this.props.init
      //stringify room data into a template literal for log to console
      let roomInfo = `${init.title}
      ${init.description}`

      this.setState({uuid: init.uuid, name: init.name, players: init.players, log: [roomInfo]})

    //Upon login, subscribe to a Pusher channel based on the player's universally unique id: p-channel-<uuid>
  
    //Bind the player channel to broadcast events and display the messages to the player
    }
  };//endCDM

  componentDidUpdate(prevProps){
    if(!prevProps.init && this.props.init){
      const init = this.props.init
      //stringify room data into a template literal for log to console
      let roomInfo = `${init.title}
      ${init.description}`

      this.setState({uuid: init.uuid, name: init.name, players: init.players, log: [roomInfo]})
    }
  }

  tryCommand = e => {
      e.preventDefault();
      const command = this.state.command
      console.log(command)
    const testedCom = validateCommand(command)
    console.log(testedCom)
    if (testedCom){
      //command is valid, send it
      if(testedCom['direction']){
        const authToken = 'Token ' + localStorage.getItem('key');
        const headers = { headers: { Authorization: authToken }};
        axios
          .post(`${hkurl}/api/adv/move/`, testedCom, headers)
          .then(res => {
            //{"uuid": "c3ee7f04-5137-427e-8591-7fcf0557dd7b",
            // "name": "testuser", "title": "Outside Cave Entrance",
            // "description": "North of you, the cave mount beckons", "players": []
            // 'error_msg': ''}
            //set up app with new user data and location
            console.log(res.data);
            if(res.data.error_msg.length > 0) alert(res.data.error_msg)
            else{
              this.addText(`${res.data.title}\n${res.data.description}`)
  
              this.setState({ players: res.data.players, command: '' });
            }
            
            
          })
          .catch(err => {
            //key is wrong, delete key from storage
            console.log(err)
            console.log(err.response);
            // this.logout();
          });
      }else if(testedCom['say']){
        //try say command
        this.say(testedCom)
          
      }

    }
  }

  parseResponse = (response) => {

  }

  say(sayObj){
    const authToken = 'Token ' + localStorage.getItem('key');
    const headers = { headers: { Authorization: authToken }};
    axios
      .post(`${hkurl}/api/adv/say/`, sayObj, headers)
      .then(res => {
        // res.data is {'name':player.name, 'message':message, 'error_msg':""}
        //set up app with new user data and location
        console.log(res.data);
        if(res.data.error_msg.length > 0) alert(res.data.error_msg)
        else{
          console.log('test')
          // this.addText(`${res.data.title}\n${res.data.description}`)
          alert(res.data)

          this.setState({command: '' });
        }
        
        
      })
      .catch(err => {
        //key is wrong, delete key from storage
        console.log(err)
        console.log(err.response);
        
      });
  }

  addText = (string) => {
    // let newLog = this.state.log + this.state.lastOutput
    const newLog = this.state.log
    console.log(newLog)
    let newText = `- - - - - - - - - - - - -
    ${string}`
    newLog.push(this.state.lastOutput)
    // const lines = (newLog.match(/\r?\n/g) || '').length + 1
    if (newLog.length > this.state.maxLogSize) {
       //if the log is full, delete the oldest command
       newLog.shift()
    }
    this.setState({log: newLog, lastOutput: newText})
 }


  handleChange = name => event => {
    this.setState({
       [name]: event.target.value,
     });
 }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.home}>
      {/* <Typography variant="headline">Current Room: {this.state.room.name}</Typography> */}
      <Console log={this.state.log} lastOutput={this.state.lastOutput}>
      <form onSubmit={this.tryCommand} className={classNames(classes.container, classes.form)} noValidate autoComplete="off">
      <span className={classes.text}>>>></span>
      <input id="commandInput" 
                     name="commandInput"
                     value={this.state.command}
                     onChange={this.handleChange('command')}
                     className={classes.commandInput} />
        {/* <Button variant="contained" color="primary" className={classes.button} type="submit"> Submit Command </Button> */}
      </form>
      </Console>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
