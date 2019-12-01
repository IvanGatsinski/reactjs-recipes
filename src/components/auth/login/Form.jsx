import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth';
import { UserContext } from '../../../contexts/User';
import { useHistory } from 'react-router-dom';
import useForm from 'react-hook-form';
import { authenticateUser } from '../../../api/auth';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
    const history = useHistory()

    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext)

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data, e) => {
        data.authType = 'login'
        try {
            const loggedInUser = await authenticateUser(data);

            setToken(loggedInUser.data._kmd.authtoken);
            localStorage.setItem('user', JSON.stringify(loggedInUser.data));
            setUser(JSON.parse(localStorage.getItem('user')));
            
            e.target.reset();

            history.push('/');
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name="username"
                    type="text" 
                    placeholder="Enter username" 
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