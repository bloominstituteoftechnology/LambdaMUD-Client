import React,{Fragment} from 'react';
import styled  from 'styled-components';
import PlayerInfo from './PlayerInfo';
import RoomInfo from './RoomInfo';
import Content from './Content';

const ContainerStyle = styled.div`
        height: 700px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-end;
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
			<Content  broadcast={this.props.broadcast} error={this.props.error} room={this.props.room}/>
			<ContainerStyle>
			<PlayerInfo user={this.props.user} />
			<RoomInfo room={this.props.room} players={this.props.players}/>
                        </ContainerStyle>
			</Wrapper>
                );

        }
}

export default Container;
