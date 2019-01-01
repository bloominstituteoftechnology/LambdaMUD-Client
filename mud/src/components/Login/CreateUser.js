import React from 'react'
import './CreateUser.css'

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleCreateSubmit = e => {
        e.preventDefault();
        const credentials = {username: this.state.username, password1: this.state.password, password2: this.state.passwordConfirm}
        this.props.handleCreate(credentials)
    }

    render() {
        return (
            <div className="createuser-ctn">
                <img alt="create-bg" src="/COLOSSUS_CAVE.png"></img>
                <form onSubmit={this.handleCreateSubmit} className="create-form">
                    <h1 className="create-header">Create User</h1>
                    <input
                        className="username"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Pick a Username!"
                    />
                    <input
                        className="username"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="Password"
                    />
                    <input
                        className="username"
                        type="password"
                        name="passwordConfirm"
                        value={this.state.passwordConfirm}
                        onChange={this.handleInputChange}
                        placeholder="Confirm Password"
                    />
                    <div className="button-container">
                        <button type="submit" className="submit-btn" onSubmit={this.handleCreateSubmit}>Submit</button>
                        <button type="button" className="submit-btn" onClick={() => this.props.newUserClear()}>Cancel</button>
                    </div>

                </form>
            </div >
        )
    }

}

export default CreateUser;