import React from 'react';

// Main Functionality: Create a game view for a logged in user
//      -Make an init request upon loading game view to receive the player's 
//       starting location and unique id
//      -Subscribe to the pusher channel named p-channel-<uuid> and bind to 
//       broadcast events (Handle incoming broadcast messages by displaying 
//       them to the player)
//      -Parse user commands, then make API calls based on valid inputs 
//       (Handle valid API responses and update the display accordingly)

// So, how do I go about initializing the game here? After the user logs in, 
// I want the login component to dissappear and the dashboard component to 
// appear. 


const GameDashboard = props => {
    return(
        <div>
            <div>
                <button type = 'submit'>Enter Game Dashboard</button>
            </div>

            <div>
                Game Dashboard
            </div>
            <br/>
            <div>
                Username: 
            </div>


            <div>

            </div>


            



            

        </div>
    )
}

export default GameDashboard;