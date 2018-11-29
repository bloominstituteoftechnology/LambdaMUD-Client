import React from "react";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";

const SignUp = () => {
    return (
        <div>
            <Form>
                <FormGroup>
                    <Input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Username"
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
                <FormGroup>
                    <Input
                        type="password"
                        name="confirm_pw"
                        id="confirm_pw"
                        placeholder="confirm"
                    />
                </FormGroup>
                <Button>Sign Up</Button>
            </Form>
        </div>
    );
};

export default SignUp;
