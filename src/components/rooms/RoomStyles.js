import styled from 'styled-components';


export const ChatSection = styled.section`
  width: 29.9%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 1200px) {
    width: 90%;
    margin: 15px auto;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-direction: row-reverse;
    padding: 10px;

    h1 {
      display: none;
    }
  }
  @media (max-width: 950px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const RecentChats = styled.div`
  height: 300px;
  margin-top: 15px;
  padding: 10px;

  p {
    margin-top: 15px;
  }

  @media (max-width: 1200px) {
    height: 50px;
    margin-top: 0;
    padding: 0;
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

  p {
    margin-top: 10px;
  }

  @media (max-width: 1200px) {
    margin-top: 0px;
  }

  @media (max-width: 850px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 55px;

    label {
      display: none;
    }
    input {
      margin-right: 1.2%;
      margin-bottom: 0;
      padding: 8px;
    }
  }
`;



export const DescriptionSection = styled.section`
  width: 40%;
  padding: 20px;
  text-align: center;
  box-shadow: inset 1px 1px 40px 1px rgba(0,0,0,.3);
  @media (max-width: 1200px) {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    border: none;
    border-bottom: 1px solid rgba(77, 77, 255, .2);
  }
  @media (max-width: 950px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const RoomLocation = styled.section`
  h2 {
    margin-top: 20px;
  }
  @media (max-width: 1200px) {
    width: 35%;
    h2 {

    }
  }
  @media (max-width: 850px) {
    width: 100%;
  }
`;

export const Description = styled.section`
  margin-top: 200px;
  h3 {
    margin-top: 20px;
    font-size: 3.5rem;
  }
  @media (max-width: 1200px) {
    width: 45%;
    margin-top: 0;
    h2 {
      font-size: 3.2rem;
    }
    h3 {
      font-size: 2.5rem;
    }
  }
  @media (max-width: 850px) {
    margin-top: 55px;
    width: 100%;
  }
`;

export const BrickWall = styled.section`
  margin-top: 100px;
  h3 {
    color: red;
    font-weight: bold;
  }
  @media (max-width: 1200px) {
    position: fixed;
    bottom: 55%;
    left: 30%;
  }
`;



export const ButtonPlayersSection = styled.section`
  width: 29.9%;
  padding: 20px;
  text-align: center;

  @media (max-width: 1200px) {
    width: 90%;
    margin: 10px auto;
    display: flex;
    justify-content: space-evenly;
    border: none;

    h1 {
      display: none;
    }
  }
  @media (max-width: 950px) {
    width: 100%;
    padding-top: 0;
  }
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
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
      @media (max-width: 1200px) {
        width: 100%;
      }
    }
  }
  @media (max-width: 1200px) {
    width: 45%;
    height: 220px;
  }
  @media (max-width: 850px) {
    width: 55%;
  }
  @media (max-width: 630px) {
    width: 80%;
  }
`;

export const PlayerSection = styled.div`
  h3 {
    margin-top: 15px;
  }
  h3:not(:first-child) {
    margin-top: 30px;
  }
  @media (max-width: 1200px) {
    width: 50%;
  }
  @media (max-width: 950px) {
    width: 50%;
  }
  @media (max-width: 850px) {
    width: 80%;
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
