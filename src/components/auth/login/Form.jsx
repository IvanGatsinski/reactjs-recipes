import React from 'react';
import useForm from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {

    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    name="email"
                    type="email" 
                    placeholder="Enter email" 
                    ref={register}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    ref={register}/>
                <Form.Text className="text-muted">
                We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm;