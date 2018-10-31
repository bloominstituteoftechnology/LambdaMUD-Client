import React from 'react'
import {HomeContainer, FormContainer} from './HomeStyles'

class Home extends React.Component {
    

    render() {
        return (
            <HomeContainer>
                <FormContainer>
                    <input placeholder="test" />
                </FormContainer>
            </HomeContainer>
        )
    }
}
    
export default Home