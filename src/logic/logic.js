export const commandCheck = command => {
  if (moves[command[0]]) {
    this.props.movePlayer(moves[command[0]], token);
  } else if (commands[command[0]] === "say") {
    command.shift();
    let message = command.join(" ");
    this.props.talkPlayer(message, token);
  } else if (commands[command[0]] === "grab") {
    command.shift();
    let item = command.join(" ");
    this.props.grabItem(item, token);
  } else if (commands[command[0]] === "drop") {
    command.shift();
    let item = command.join(" ");
    this.props.dropItem(item, token);
  } else if (commands[command[0]] === "i") {
    command.shift();
    this.props.fetchInventory(token);
  } else if (commands[command[0]] === "equip") {
    command.shift();
    let item = command.join(" ");
    this.props.equipItem(item, token);
  } else if (commands[command[0]] === "unequip") {
    command.shift();
    let item = command.join(" ");
    this.props.unequipItem(item, token);
  }
};
