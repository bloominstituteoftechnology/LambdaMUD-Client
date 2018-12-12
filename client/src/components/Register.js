import React from 'react';

class Register extends React.Component {
    state = {
        // creating json object with username, pass1, pass2
        username: "",
        password1: "",
        password2: "",
    }

    // Handle submit
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Handle submit
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.password1 !== this.state.password2) {
            alert("Your password doesn't match the confirmation password")
        }
        else if (this.state.password1.length < 9 || this.state.password2 < 9) {
            alert("Password length must be at least 9 characters")
        }
        else {
            this.props.register({
                username: this.state.username,
                password1: this.state.password1,
                password2: this.state.password2,
            })
        }
        this.setState({
            username: "",
            password1: "",
            password2: "",
        })
    }

    // Render
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Label>
                    <Input
                        name="username"
                        type="text"
                        placeholder="new username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                </Label>
                <Label>
                    <Input
                        name="password1"
                        type="password"
                        placeholder="new password"
                        onChange={this.handleChange}
                        value={this.state.password1}
                    />
                </Label>
                <Label>
                    <Input
                        name="password2"
                        type="password"
                        placeholder="confirm password"
                        onChange={this.handleChange}
                        value={this.state.password2}
                    />
                </Label>
                <Button>Register</Button>
                <Toggle onClick={this.props.toggleCreateUserForm}>Cancel</Toggle>
            </Form>
        )
    }
}
