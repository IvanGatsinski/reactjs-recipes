import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import uuid from 'uuid'

const CreateRecipe = () => {

    const [inputCount, setInputCount] = useState([{
        id: uuid(),
    }]);
    const { register, handleSubmit } = useForm()

    const onSubmit = (value) => {
        console.log(value)
    }
    
    const ingredientsInputFields = () => {

       return inputCount.map(input => {
            const ingredient = `ingredient-${input.id}`
            return (
                <Form.Group key={input.id}>
                    <Form.Label>Ingredient</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Add ingredient" 
                        name={ingredient}
                        ref={register}
                    />
                    <Form.Text className="text-muted">
                        Example: 3 eggs or 250ml milk, ect...
                    </Form.Text>
                        <Button 
                        onClick={() => { removeIngredient(input.id)} } 
                        variant="warning"
                        size="sm"
                        >
                            Remove ingredient
                        </Button>
                </Form.Group>
            )
        })
    };

    const addIngredient = () => {   
        setInputCount([...inputCount, { id: uuid() }]);
    }
    const removeIngredient = (id) => {
        setInputCount(
            [...inputCount].filter(input => input.id !== id)
        );
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="6">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Button
                         onClick={addIngredient} 
                         variant="success"
                         className="my-3"
                         size="sm"
                         >Add ingredient
                        </Button>
                        {ingredientsInputFields()}

                        <Form.Group>
                            <Form.Label>Describe recipe</Form.Label>
                            
                            <Form.Control 
                                as="textarea" 
                                rows="3"
                                placeholder="Enter recipe description" 
                                name="description"
                                ref={register}
                            />
                            <Form.Text className="text-muted">
                            Describe how to cook your recipe.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Avarage cooking time</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Cooking time" 
                                name="time"
                                ref={register}
                            />
                            <Form.Text className="text-muted">
                            What is the avarage time to cook this meal by this recipe.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default CreateRecipe;