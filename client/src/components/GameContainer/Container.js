import React,{Fragment} from 'react';
import styled  from 'styled-components';
import PlayerInfo from './PlayerInfo';
import RoomInfo from './RoomInfo';
import Content from './Content';
import InputCommands from './InputCommands';

const ContainerStyle = styled.div`
        height: 700px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
`

const ContentStyle = styled.div`
        height: 700px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
`


const Wrapper = styled.div`
        //height: 700px;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
`


class Container extends React.Component{
        constructor(props){
                super(props);
                this.state={}
        }

        render(){
                return(
			<Wrapper>
			<ContentStyle>
			<Content  broadcast={this.props.broadcast} error={this.props.error} room={this.props.room}/>
			<InputCommands input={this.props.input} inputHandler={this.props.inputHandler}  inputParser={this.props.inputParser}/>
			</ContentStyle>

			<ContainerStyle>
			<PlayerInfo user={this.props.user} />
			<RoomInfo room={this.props.room} players={this.props.players}/>
                        </ContainerStyle>
			</Wrapper>
                );

        }
}

export default Container;
