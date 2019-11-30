import React from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { authenticateUser } from '../../../api/auth';

const RegisterForm = () => {

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data, e) => {
        
        data.recipe_ids = [];
        data.authType = 'register';

        try {
            const registeredUser = await authenticateUser(data);
            history.push('/login')

        } catch (error) {
            throw error;
        }

        e.target.reset();
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                 type="text" 
                 placeholder="Enter username" 
                 name="username"
                 ref={register}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                 type="email" 
                 placeholder="Enter email" 
                 name="email"
                 ref={register}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                name="password"
                ref={register}/>
                <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    )
}

export default RegisterForm;