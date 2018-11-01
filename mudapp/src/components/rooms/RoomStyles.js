import styled from 'styled-components';


export const ChatSection = styled.section`
  width: 29.9%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const RecentChats = styled.div`
  height: 300px;
  margin-top: 15px;
  padding: 10px;

  p {
    margin-top: 15px;
  }
`;

export const ChatForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  label {
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: .5px solid rgba(77, 77, 255, .5);
    border-radius: 10px;
    font-size: 1.7rem;
  }

  button {
    width: 80%;
    padding: 10px 5%;
  }
`;


export const DescriptionSection = styled.section`
  width: 40%;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(77, 77, 255, .2);
  border-bottom: none;
  border-top: none;
`;




export const ButtonPlayersSection = styled.section`
  width: 29.9%;
  padding: 20px;
  text-align: center;
`;


export const ButtonSection = styled.section`
  height: 270px;
  margin-top: 20px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  
    button {
      width: 30%;
      margin: 15px 5%;
    }
  }
`;


export const PlayerSection = styled.div`
 h3 {
   margin-top: 15px;
 }
`;

export const PlayerMovement = styled.div`
  padding: 10px;
  p {
    margin-top: 15px;
  }
`;

export const PlayersInRoom = styled.div`
  margin-top: 15px;
  height: 300px;
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(77, 77, 255, .5); 
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #D89922;
    }
  }

  p {
    margin-top: 10px;
  }
`;

