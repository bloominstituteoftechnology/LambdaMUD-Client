String.prototype.count = function(c) {
  var result = 0,
    i = 0;
  for (i; i < this.length; i++) if (this[i] == c) result++;
  console.log(result);
  return result;
};
module.exports = {
  hkurl: 'https://lambda-cs.herokuapp.com',
  validateCommand: command => {
    const com = command.trim();
    console.log(com);
    //one command given
    let tested = module.exports.parseCommand(com);
    if (tested) return tested;
    else return false;
  },
  parseCommand: commandString => {
    //first check if more than one word or if first word is go or move
    const getDirection = dirStr => {
      const dir = dirStr.toLowerCase();
      if (dir === 'n' || dir === 'north') return { direction: 'n' };
      else if (dir === 's' || dir === 'south') return { direction: 's' };
      else if (dir === 'w' || dir === 'west') return { direction: 'w' };
      else if (dir === 'e' || dir === 'east') return { direction: 'e' };
      else return false;
    };

    if (commandString.count(' ') < 1) {
      //parse direction
      return getDirection(commandString);
    } else {
      const command1 = commandString.substring(0, commandString.indexOf(' '));
      const command2 = commandString.substring(commandString.indexOf(' ') + 1);
      if (command1 == 'move' || command1 == 'go') {
        return getDirection(command2);
      } else if (command1 == 'say') {
        return { say: command2 };
      }
    }
    console.log(`command not parsed: ${commandString}`);
    return false;
  },
  pusher: {
    APP_KEY: '5dedf326a82a4fd54ed3',
    APP_CLUSTER: 'us2'
  }
};
