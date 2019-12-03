import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { fetchRecipe, updateRecipe } from '../../api/recipes';
import uuid from 'uuid';

const EditRecipe = () => {

    const history = useHistory()
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const { user } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => { 
        (async () => {
            const fetchedRecipe = await fetchRecipe(id);
            //setRecipes(fetchedRecipe.data)
            setRecipe(fetchedRecipe.data)
        })()
    }, []);

    useEffect(() => {
        return () => setRecipe(null);
    }, []);

    const onSubmit = async (formData, e) => {
        let recipeData = {
            name: formData.name,
            type: formData.type,
            description: formData.description,
            imgUrl: formData.imgUrl + '/100px180',
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
            await updateRecipe(id,recipeData);
            history.push(`/user/${user._id}/recipes`);
        } catch (error) {
            throw error;
        }
        e.target.reset()
    }

    const formRecipe = recipe !== null ? 
    (
    <Form onSubmit={handleSubmit(onSubmit)}>
        {recipe.ingredients.map(ingr => {
            const ingredient = `ingredient-${uuid()}`
            return (
                <Form.Group key={uuid()}>
                    <Form.Label>Ingredient</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Add ingredient" 
                        defaultValue={ingr}
                        name={ingredient}
                        ref={register}
                    />
                    <Form.Text className="text-muted">
                        Example: 3 eggs or 250ml milk, ect...
                    </Form.Text>
                </Form.Group>
            )
        })}
        <Form.Group>
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Recipe name"
                defaultValue={recipe.name}
                name="name"
                ref={register}
            />
            <Form.Text className="text-muted">
            Copy-paste the image-url.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Recipe Type</Form.Label>
            <Form.Control defaultValue={recipe.type} as="select" name="type" ref={register}>
                <option>Salads</option>
                <option>Soups</option>
                <option>Main Meals</option>
                <option>Desserts</option>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
                defaultValue={recipe.imgUrl}
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
                defaultValue={recipe.description}
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
                defaultValue={recipe.cook_time}
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
    )
    : (<h2>Loading......</h2>)

    // const recipe = recipe !== null ? { 
    //     name: recipes.name,
    //     type: recipes.type,
    //     description: recipes.description,
    //     imgUrl: recipes.imgUrl,
    //     cook_time: recipes.cook_time
    //  } : false



    // const ingredientsInputFields = () => {
    //     console.log(123, ingredients)
    //     return ingredients.map(ingr => {
    //          const ingredient = `ingredient-${uuid()}`
    //          return (
    //              <Form.Group key={uuid()}>
    //                  <Form.Label>Ingredient</Form.Label>
    //                  <Form.Control 
    //                      type="text" 
    //                      placeholder="Add ingredient" 
    //                      value={ingr}
    //                      name={ingredient}
    //                      ref={register}
    //                  />
    //                  <Form.Text className="text-muted">
    //                      Example: 3 eggs or 250ml milk, ect...
    //                  </Form.Text>
    //              </Form.Group>
    //          )
    //      })
    //  };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs="6">
                   {formRecipe}
                </Col>
            </Row>
        </Container>
    )
}

export default EditRecipe;