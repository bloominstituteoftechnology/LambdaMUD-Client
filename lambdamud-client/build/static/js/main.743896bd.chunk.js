(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(e,t,a){e.exports=a(59)},33:function(e,t,a){},35:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(24),r=a.n(s),i=(a(33),a(8)),l=a(9),c=a(11),m=a(10),p=a(12),d=(a(35),a(61)),u=a(63),h=a(13),g=a(4),v=a.n(g),w=a(60),f=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).changeHandler=function(e){a.setState(Object(h.a)({},e.target.name,e.target.value))},a.password1Toggle=function(){"Show"===a.state.password1Tag?a.setState({password1Tag:"Hide"}):a.setState({password1Tag:"Show"}),"password"===a.state.password1State?a.setState({password1State:"text"}):a.setState({password1State:"password"})},a.password2Toggle=function(){"Show"===a.state.password2Tag?a.setState({password2Tag:"Hide"}):a.setState({password2Tag:"Show"}),"password"===a.state.password2State?a.setState({password2State:"text"}):a.setState({password2State:"password"})},a.submitRegister=function(e){e.preventDefault(),a.state.password1===a.state.password2?v.a.post("https://lambdamud-ghr.herokuapp.com/api/registration/",{username:a.state.username,password1:a.state.password1,password2:a.state.password2}).then(function(e){console.log(e.data),a.props.login(e.data.key,a.state.username),e.data.key&&a.props.history.push("/")}).catch(function(e){console.log(e.response),alert(e.response.data.error)}):alert("The passwords do not match.")},a.state={username:"",password1:"",password2:"",password1Tag:"Show",password2Tag:"Show",password1State:"password",password2State:"password"},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"registerBody"},o.a.createElement("h1",null,"Please register"),o.a.createElement("form",{onSubmit:this.submitRegister,className:"registerForm"},o.a.createElement("div",null,"Username",o.a.createElement("input",{type:"text",name:"username",placeholder:"Username",value:this.state.username,onChange:this.changeHandler})),o.a.createElement("div",null,"Password",o.a.createElement("input",{type:this.state.password1State,name:"password1",placeholder:"Password",value:this.state.password1,onChange:this.changeHandler}),o.a.createElement("button",{onClick:this.password1Toggle,type:"button"},this.state.password1Tag)),o.a.createElement("div",null,"Password, again",o.a.createElement("input",{type:this.state.password2State,name:"password2",placeholder:"Password, again",value:this.state.password2,onChange:this.changeHandler}),o.a.createElement("button",{onClick:this.password2Toggle,type:"button"},this.state.password2Tag)),o.a.createElement("button",{type:"submit"},"Submit")),o.a.createElement("h1",null,"Log in instead"),o.a.createElement(w.a,{to:"/login"},"Log in"))}}]),t}(o.a.Component),E=a(3),S=a(25),b=a.n(S),k=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=function(){var e=localStorage.getItem("token");v.a.get("https://lambdamud-ghr.herokuapp.com/api/adv/init/",{headers:{Authorization:"Token ".concat(e)}}).then(function(e){a.setState({name:e.data.name,movesLog:Object(E.a)(a.state.movesLog).concat([{title:e.data.title,description:e.data.description,players:e.data.players,inventory:e.data.inventory}]),uuid:e.data.uuid,currentRoom:e.data.title});var t=new b.a("990ddef61491c8ebceb4",{cluster:"us2"});a.state.uuid&&(a.channel=t.subscribe("p-channel-".concat(a.state.uuid),a.state.uuid)),a.setState({channelSubbed:!0}),a.state.channelSubbed&&a.channel.bind("broadcast",function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:e.message}])})})});var t=setInterval(function(){return a.toggleFlicker()},5e3);a.setState({interval:t})},a.componentWillUnmount=function(){clearInterval(a.state.interval)},a.parseCommand=function(e){if(e.preventDefault(),a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{command:"> "+a.state.input}])}),"n"===a.state.input.toLowerCase()||"north"===a.state.input.toLowerCase())a.handleMove("n");else if("s"===a.state.input.toLowerCase()||"south"===a.state.input.toLowerCase())a.handleMove("s");else if("e"===a.state.input.toLowerCase()||"east"===a.state.input.toLowerCase())a.handleMove("e");else if("w"===a.state.input.toLowerCase()||"west"===a.state.input.toLowerCase())a.handleMove("w");else if(a.state.input.toLowerCase().startsWith("say"))a.handleSay(a.state.input.slice(4));else if(a.state.input.toLowerCase().startsWith("shout"))a.handleShout(a.state.input.slice(6));else if(a.state.input.toLowerCase().startsWith("whisper")){var t=a.state.input.split(" ");console.log(t[1]);var n=a.state.input.split(" ");n.shift(),n.shift();var o=n.join(" ");a.handleWhisper(o,t[1])}else if("h"===a.state.input.toLowerCase()||"help"===a.state.input.toLowerCase())a.handleHelp();else if("map"===a.state.input.toLowerCase())a.handleMap();else if("knock stump"===a.state.input.toLowerCase())a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{command:"> "+a.state.input,error:"You realize you are not in Transylvania anymore."}])});else if(a.state.input.toLowerCase().startsWith("take")){var s=a.state.input.split(" ");s.shift();for(var r=0;r<s.length;r++)s[r]=s[r].charAt(0).toUpperCase()+s[r].slice(1);var i=s.join(" ");a.handleTake(i)}else if(a.state.input.toLowerCase().startsWith("drop")){var l=a.state.input.split(" ");l.shift();for(var c=0;c<l.length;c++)l[c]=l[c].charAt(0).toUpperCase()+l[c].slice(1);var m=l.join(" ");a.handleDrop(m)}else"inv"===a.state.input.toLowerCase()||"inventory"===a.state.input.toLowerCase()?a.handleInv():a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{command:"> "+a.state.input,error:"That command does not exist."}])});a.setState({input:""})},a.handleMove=function(e){var t=localStorage.getItem("token"),n={Authorization:"Token ".concat(t),"Content-Type":"application/json"},o={direction:e};v.a.post("https://lambdamud-ghr.herokuapp.com/api/adv/move/",o,{headers:n}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{title:e.data.title,description:e.data.description,players:e.data.players,error:e.data.error_msg}]),currentRoom:e.data.title}),v.a.get("https://lambdamud-ghr.herokuapp.com/api/adv/init/",{headers:{Authorization:"Token ".concat(t)}}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{inventory:e.data.inventory}])})}).catch(function(e){console.log(e)})}).catch(function(e){console.log(e)})},a.handleSay=function(e){var t=localStorage.getItem("token"),n={Authorization:"Token ".concat(t),"Content-Type":"application/json"},o={message:e};v.a.post("https://lambdamud-ghr.herokuapp.com/api/adv/say/",o,{headers:n}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:e.data.message,players:[a.state.name]}])})}).catch(function(e){console.log(e)})},a.handleShout=function(e){var t=localStorage.getItem("token"),n={Authorization:"Token ".concat(t),"Content-Type":"application/json"},o={message:e};v.a.post("https://lambdamud-ghr.herokuapp.com/api/adv/shout/",o,{headers:n}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:e.data.message}])})}).catch(function(e){console.log(e)})},a.handleWhisper=function(e,t){var n=localStorage.getItem("token"),o={Authorization:"Token ".concat(n),"Content-Type":"application/json"},s={message:e,toUser:"".concat(t),test:"anything"};v.a.post("https://lambdamud-ghr.herokuapp.com/api/adv/whisper/",s,{headers:o}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:e.data.message}])})}).catch(function(e){console.log(e)})},a.handleHelp=function(){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{title:"Help",description:'To move North, type "n" or "north". To move South, type "s" or "south". To move East, type "e" or "east". To move West, type "w" or "west". To say something to players in your current room, type "say <something>". To shout to all players in the game, type "shout <something>". To whisper something to one player, type "whisper <person> <something>". To see the map, type "map". To take an item, type "take <full item name>". To drop an item, type "drop <full item name>". To query your inventory, type "inv" or "inventory".'}])})},a.handleMap=function(){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{title:"Map",description:o.a.createElement("div",{className:"mapContainer"},o.a.createElement("div",{className:"mapRow1"},o.a.createElement("div",{className:"Sandy Beach"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Sandy Beach"),o.a.createElement("div",{className:"horizMapLine"}),o.a.createElement("div",{className:"Glimmering Lighthouse"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Glimmering Lighthouse"),o.a.createElement("div",{className:"horizMapLine"}),o.a.createElement("div",{className:"Hidden Room"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Hidden Room")),o.a.createElement("div",{className:"mapRow2"},o.a.createElement("div",{className:"mapBoxBlankShort"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"mapBoxBlankShort"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"vertMapLineSpecial"})),o.a.createElement("div",{className:"mapRow3"},o.a.createElement("div",{className:"mapBoxBlank"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"Grand Overlook"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Grand Overlook"),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"Treasure Chamber"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Treasure Chamber")),o.a.createElement("div",{className:"mapRow4"},o.a.createElement("div",{className:"mapBoxBlankShort"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"vertMapLine"}),o.a.createElement("div",{className:"mapBoxBlankShortSquished"}),o.a.createElement("div",{className:"vertMapLine"})),o.a.createElement("div",{className:"mapRow5"},o.a.createElement("div",{className:"mapBoxBlank"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"Foyer"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Foyer"),o.a.createElement("div",{className:"horizMapLine"}),o.a.createElement("div",{className:"Narrow Passage"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Narrow Passage")),o.a.createElement("div",{className:"mapRow6"},o.a.createElement("div",{className:"mapBoxBlankShort"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"vertMapLine"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"mapBoxBlankShort"})),o.a.createElement("div",{className:"mapRow7"},o.a.createElement("div",{className:"mapBoxBlank"}),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"Outside Cave Entrance"===a.state.currentRoom?"mapBox mapBoxHighlighted":"mapBox"},"Outside Cave Entrance"),o.a.createElement("div",{className:"horizMapLineBlank"}),o.a.createElement("div",{className:"mapBoxBlank"})))}])})},a.handleTake=function(e){var t=localStorage.getItem("token"),n={Authorization:"Token ".concat(t),"Content-Type":"application/json"},o={item:e};v.a.post("https://lambdamud-ghr.herokuapp.com/api/adv/take/",o,{headers:n}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:e.data.message,error:e.data.error}])})}).catch(function(e){console.log(e)})},a.handleDrop=function(e){var t=localStorage.getItem("token"),n={Authorization:"Token ".concat(t),"Content-Type":"application/json"},o={item:e};v.a.post("https://lambdamud-ghr.herokuapp.com/api/adv/drop/",o,{headers:n}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:e.data.message,error:e.data.error}])})}).catch(function(e){console.log(e)})},a.handleInv=function(){var e=localStorage.getItem("token"),t={Authorization:"Token ".concat(e),"Content-Type":"application/json"};v.a.get("https://lambdamud-ghr.herokuapp.com/api/adv/inventory/",{headers:t}).then(function(e){a.setState({movesLog:Object(E.a)(a.state.movesLog).concat([{message:"You have: ".concat(e.data.items)}])})}).catch(function(e){console.log(e)})},a.changeHandler=function(e){a.setState(Object(h.a)({},e.target.name,e.target.value))},a.toggleFlicker=function(){a.state.isFlickering?a.setState({isFlickering:!1,flickerClass:"printList",flickerTag:"on"}):a.setState({isFlickering:!0,flickerClass:"printList crt",flickerTag:"off"})},a.state={input:"",name:"",movesLog:[],uuid:null,channelSubbed:!1,currentRoom:"",flickerClass:"printList crt",isFlickering:!0,flickerTag:"off",interval:null},a.channel=null,a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.movesLog.slice().reverse();return o.a.createElement("div",null,o.a.createElement("div",{className:"gameBox"},o.a.createElement("p",null,"Welcome, ",this.state.name),o.a.createElement("div",{className:this.state.flickerClass},t.map(function(e){return o.a.createElement("div",null,e.command?o.a.createElement("p",{className:"commandP"},e.command):null,e.title?o.a.createElement("h4",{className:"titleH4"},e.title):null,e.description?o.a.createElement("p",{className:"descP"},e.description):null,e.players&&e.players.length?o.a.createElement("p",{className:"playersP"},"Players: ",e.players.join(", ")):null,e.inventory&&e.inventory.length?o.a.createElement("p",{className:"invP"},"This room contains: ",e.inventory.join(", ")):null,e.message?o.a.createElement("p",{className:"messageP"},e.message):null,e.error?o.a.createElement("p",{className:"errorP"},e.error):null)})),o.a.createElement("form",{onSubmit:this.parseCommand,className:"inputAndButton"},o.a.createElement("input",{type:"text",name:"input",value:this.state.input,placeholder:"Type a direction or command or message here.",onChange:this.changeHandler,className:"gameInput",autocomplete:"off"}),o.a.createElement("button",{type:"submit",className:"gameSubmit"},"Submit")),o.a.createElement("button",{type:"button",onClick:function(){return clearInterval(e.state.interval)}},"Cancel screen flicker auto-toggle"),o.a.createElement("button",{type:"button",onClick:this.toggleFlicker},"Turn screen flicker ",this.state.flickerTag),o.a.createElement("button",{type:"button",onClick:this.props.logout},"Log out")))}}]),t}(o.a.Component),y=function(e){return function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).changeHandler=function(e){a.setState(Object(h.a)({},e.target.name,e.target.value))},a.passwordToggle=function(){"Show"===a.state.passwordTag?a.setState({passwordTag:"Hide"}):a.setState({passwordTag:"Show"}),"password"===a.state.passwordState?a.setState({passwordState:"text"}):a.setState({passwordState:"password"})},a.handleLogin=function(e){e.preventDefault(),v.a.post("https://lambdamud-ghr.herokuapp.com/api/login/",{username:a.state.username,password:a.state.password}).then(function(e){a.props.login(e.data.key,a.state.username),e.data.key&&a.props.history.push("/")}).catch(function(e){console.log(e.response),alert(e.response.data.error)})},a.state={username:"",password:"",passwordState:"password",passwordTag:"Show"},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"loginBody"},o.a.createElement("h1",null,"Please log in"),o.a.createElement("form",{onSubmit:this.handleLogin,className:"loginForm"},o.a.createElement("div",null,"Username",o.a.createElement("input",{type:"text",name:"username",placeholder:"Username",value:this.state.username,onChange:this.changeHandler})),o.a.createElement("div",null,"Password",o.a.createElement("input",{type:this.state.passwordState,name:"password",placeholder:"Password",value:this.state.password,onChange:this.changeHandler}),o.a.createElement("button",{type:"button",onClick:this.passwordToggle},this.state.passwordTag)),o.a.createElement("button",{type:"submit"},"Submit")),o.a.createElement("h1",null,"Register instead"),o.a.createElement(w.a,{to:"/register"},"Register"))}}]),t}(o.a.Component)},L=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).componentDidMount=function(){var t=localStorage.getItem("token"),a=localStorage.getItem("username");t&&a?(e.setState({loggedIn:!0}),e.props.history.push("/")):(e.setState({loggedIn:!1}),e.props.history.push("/login"))},e.handleLogin=function(t,a){localStorage.setItem("token",t),localStorage.setItem("username",a),e.setState({loggedIn:!0})},e.handleLogout=function(){localStorage.removeItem("token"),localStorage.removeItem("username"),e.props.history.push("/login"),e.setState({loggedIn:!1})},e.state={loggedIn:!1},e}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return this.state.loggedIn?o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("h1",null,"LambdaMUD - GHR"),o.a.createElement(d.a,{path:"/",render:function(t){return o.a.createElement(k,Object.assign({},t,{logout:e.handleLogout}))}}))):o.a.createElement("div",null,o.a.createElement(d.a,{path:"/login",render:function(t){return o.a.createElement(N,Object.assign({},t,{login:e.handleLogin}))}}),o.a.createElement(d.a,{path:"/register",render:function(t){return o.a.createElement(f,Object.assign({},t,{login:e.handleLogin}))}}))}}]),t}(n.Component),N=y(L),T=Object(u.a)(L),B=a(62);r.a.render(o.a.createElement(B.a,null,o.a.createElement(T,null)),document.getElementById("root"))}},[[28,2,1]]]);
//# sourceMappingURL=main.743896bd.chunk.js.map