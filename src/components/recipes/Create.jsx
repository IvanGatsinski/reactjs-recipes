import React, { useState, useContext } from 'react';
import useForm from 'react-hook-form';
import { UserContext } from '../../contexts/User';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import uuid from 'uuid';
import { addRecipe } from '../../api/recipes';

const CreateRecipe = () => {

    const history = useHistory();
    const { user } = useContext(UserContext);
    const [inputCount, setInputCount] = useState([{
        id: uuid(),
    }]);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (formData, e) => {
        let recipeData = {
            author: user.username,
            name: formData.name,
            type: formData.type,
            description: formData.description,
            imgUrl: formData.imgUrl,
            cook_time: formData.time,
            ingredients: [],
        };

        for (const key in formData) {
            if (key !== 'name' && 
                key !== 'type' && 
                key !== 'description' && 
                key !== 'imgUrl' && 
                key !== 'time') {
                recipeData.ingredients.push(formData[key]);
            }
        };

        try {
            await addRecipe(recipeData);
            history.push('/');
        } catch (error) {
            throw error;
        }
        e.target.reset()
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
                        disabled={inputCount.length <= 1 ? true : false}
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
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Recipe name" 
                                name="name"
                                ref={register}
                            />
                            <Form.Text className="text-muted">
                            Copy-paste the image-url.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Recipe Type</Form.Label>
                            <Form.Control as="select" name="type" ref={register}>
                                <option>Salads</option>
                                <option>Soups</option>
                                <option>Main Meals</option>
                                <option>Desserts</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Image URL" 
                                name="imgUrl"
                                ref={register}
                            />
                            <Form.Text className="text-muted">
                            Copy-paste the image-url.
                            </Form.Text>
                        </Form.Group>

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