import React, { Fragment } from 'react';
import useForm from 'react-hook-form';
import { Jumbotron, Container, Form, Button } from 'react-bootstrap';

const Register = () => {

    const { register, handleSubmit } = useForm()
    const onSubmit = values => console.log(values)

    return (
        <Fragment>
            <Jumbotron fluid>
                <Container>
                    <h2>Sign-up to join our community.</h2>
                    {/* <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p> */}
                </Container>
            </Jumbotron>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                     type="email" 
                     placeholder="Enter email" 
                     name="email"
                     ref={register}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    ref={register}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    )
}
export default Register;