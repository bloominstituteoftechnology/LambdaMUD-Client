import React from 'react';
import classNames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, List, MenuItem, Drawer, Divider, FormControl, Select, Input, FormHelperText } from '@material-ui/core';
import  MenuIcon  from '@material-ui/icons/Menu';
import  HomeIcon  from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InsertComment from '@material-ui/icons/InsertComment';
import styled from 'styled-components';
import App from '../App'

const StyledLink = styled(Link)`
    color: white;
    &:hover{
        color:#b42d33;
    }
`
const StyledFormControl = styled(FormControl)`
margin-right: 20px;
`
const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
   flex: 1,
   textAlign: "left",
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'linear-gradient(to bottom, rgba(0, 118, 191, .55) 0%, rgba(0, 118, 191, .65) 30%, rgba(0, 118, 191, .75) 65%, rgba(0, 118, 191, .9) 85%, rgba(0, 118, 192, 1) 100%)',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  homeButton: {
    marginTop: 10,
    marginRight: 12,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  formControl: {
    margin: theme.spacing.unit,
    // minWidth: 120,
    color: 'white',
    marginRight: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    background: 'lightgrey',
  },
  select: {
    color: 'white',
    '&:before': {
        borderColor: 'white',
    },
    '&:after': {
        borderColor: 'white',
    }
},
icon: {
    fill: 'white',
},
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left',
    console: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleChange = event => {
    // this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value)
    this.state.console.selectUid(event.target.value)
  };

  showConsole(){
    if (this.state.console){
      return (
      <StyledFormControl id='console' className={this.props.classes.formControl} color={'inherit'}>
        <Select
          value={this.state.console.currentUid}
          onChange={this.handleChange}
          input={<Input name="uidselect" id="uidselect-helper" />}
          className={this.props.classes.select}
          // inputProps={{
          //   classes: {
          //     icon: this.props.classes.icon
          //   }
          // }}
        >
          <MenuItem value={this.state.console.myUid} color={'inherit'}>
            <em>My Profile</em>
          </MenuItem>
          {this.state.console.names.map((name, i) => 
          <MenuItem key={i} value={this.state.console.uids[i]} color={'inherit'}>{name}</MenuItem>
          )}
        </Select>
        <FormHelperText className={this.props.classes.select}>Select a profile to view</FormHelperText>
      </StyledFormControl>
      )
    }
  }

  updateConsole = ( consoleOps = false) => {
    if(consoleOps){
      //console data being sent from App
      if(this.state.console.role != consoleOps.role || this.state.console.myUid != consoleOps.myUid || (consoleOps.clients && this.state.console.uids) && (this.state.console.uids.length != consoleOps.clients.length)){
        //newer console data, update state
        console.log('test1')
        const namesArr = []
        const uidsArr = consoleOps.clients.map(client => {
          const uid = Object.keys(client)[0];
          if(uid !== consoleOps.myUid){
           namesArr.push(Object.values(client)[0])
           return uid;
          }else return;
        })
        const newConsole = Object.assign({}, consoleOps)
        newConsole.uids = uidsArr
        newConsole.names = namesArr
        this.setState({console: newConsole})
      }
    } else{
      //console data not being sent from App
      if(this.state.console){
        console.log('test2')
        this.setState({console: false})
      } 
    }
  }//end updateConsole

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List><Link to="/"><Typography>
            <IconButton color={"inherit"}  aria-label="Home" >
               <HomeIcon/> 
            </IconButton>
            Dashboard 
        </Typography></Link></List>
        <Divider />
        <List><Link to="/surveys"> <Typography>
            <IconButton color={"inherit"}  aria-label="Home">
               <InsertComment/> 
            </IconButton> My Surveys  </Typography> </Link></List>
      </Drawer>
    );


    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              {new Date().getFullYear()} Financial Systems Security
              </Typography>
              {this.showConsole()}
              <StyledLink to="/">
              <IconButton color={"inherit"}  aria-label="Home" className={classes.homeButton}>
                   <HomeIcon/> 
               </IconButton>
               </StyledLink>
            </Toolbar>
          </AppBar>
          {drawer}

          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {/* <Typography>{'You think water moves fast? You should see ice.'}</Typography> */}
            <App />
          </main>
        </div>
      </div>
    );
  }
}


export default withRouter(withStyles(styles, { withTheme: true })(PersistentDrawer));