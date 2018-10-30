import React,{Fragment} from 'react';
import styled  from 'styled-components';
import PlayerInfo from './PlayerInfo';
import RoomInfo from './RoomInfo';

const ContainerStyle = styled.div`
        height: 700px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-end;


`
class Container extends React.Component{
        constructor(props){
                super(props);
                this.state={}
        }

        render(){
                return(
                        <ContainerStyle>
			<PlayerInfo user={this.props.user} />
			<RoomInfo room={this.props.room} />
                        </ContainerStyle>
                );

        }
}

export default Container;
