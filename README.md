# LambdaMUD-Client
Front-end for the [LambdaMUD-Project](https://github.com/LambdaSchool/LambdaMUD-Project).

## Trello Set Up:
[Trello Link](https://trello.com/b/oRQlvX7J/lambdamud-bdj)

- [x] Create a Trello account if you don't have one already
- [x] Create a new board called "LambdaMUD - {Your Name}"
- [x] Create lists titled `backlog`,`To Do`, `In Progress`, and `Done`
- [x] Fill in the `To Do` list with the MVP features listed below
- [x] Fill in the `backlog` list with all the extra features listed below
- [x] Share your board with the project manager that has been assigned to you. If you have not been assigned yet, reach out to your lead PM for guidance
- [x] Add your Trello URL to your project's README.md file. Commit the change, push it to your repository & submit a pull request

## MVP Features:

#### Client
- [x] Create a standalone frontend app that communicates with the server via API calls
- [x] Be able to create a new account on the server (implemented on server)
- [x] Be able to log in to the server (implemented on server)
- [ ] Create an interface that displays the current room name, its description and the other players in the room
- [ ] Be able to move between rooms and update the display accordingly (implemented on server)
- [ ] Be able to use a `say` command to say things that other people in the room will see (server implementation incomplete)
- [ ] Upon login, subscribe to a Pusher channel based on the player's universally unique id: `p-channel-<uuid>`
- [ ] Bind the player channel to `broadcast` events and display the messages to the player
- [ ] Alert the player when someone enters and leaves the current room (implemented on server)
- [ ] Alert the player when someone in the current room says something (server implementation incomplete)

#### Server
- [ ] Create a new API endpoint for `say` which broadcasts a message to other players in the current room
- [ ] Deploy to Heroku

#### General
- [ ] Header comments in all source files that describe overall what the file does
- [ ] Header comments on all functions that describe what the function does, function arguments, and return values
