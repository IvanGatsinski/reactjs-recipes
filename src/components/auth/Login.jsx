import React, { Fragment } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button } from 'react-bootstrap';
import useForm from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data);

    return (
        <Fragment>
            <Jumbotron fluid>
                <Container>
                    <h2>Sign-in to explore our authentic recipes.</h2>
                </Container>
            </Jumbotron>
            <Container>
                <Row className="justify-content-center">
                    <Col xs="6">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email" 
                                    placeholder="Enter email" 
                                    ref={register}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password" 
                                    placeholder="Password" 
                                    ref={register}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default Login;