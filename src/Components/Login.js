import React from "react";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";

const Login = () => {
    return (
        <div>
            <Form>
                <FormGroup>
                    <Input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="username"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                    />
                </FormGroup>
                <Button>Login</Button>
            </Form>
        </div>
    );
};

export default Login;
