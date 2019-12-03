import React,{ useEffect, useContext } from 'react'
import { Container, Row, Col, Card, Button, ButtonToolbar } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';
import { fetchUserRecipes, removeRecipe } from '../../api/recipes';
import { RecipeContext } from '../../contexts/Recipe';

const UserRecipes = () => {

    const { id } = useParams();
    const { recipes, setRecipes, clearAllRecipes } = useContext(RecipeContext);

    const viewRoute = recipeId => `/recipe/${recipeId}/view`;
    const updateRoute = recipeId => `/recipe/${recipeId}/edit`;

    useEffect(() => {
        fetchUserRecipes(id)
            .then(({ data }) => {
                setRecipes(data)
            })
            .catch(err => {throw err})
    }, [])

    useEffect(() => {
        return () => clearAllRecipes();
    }, []);

    const deleteRecipe = async (recipeId) => {
        try {
            await removeRecipe(recipeId);
            const updatedRecipes = await fetchUserRecipes(id)
            setRecipes(updatedRecipes.data)
        } catch (error) {
            throw error;
        }
    }

    const userRecipes = recipes !== null ?
    [...recipes].map(recipe => (
        <Row className="justify-content-center my-2" key={recipe._id}>
        <Col xs={12} md={8} lg={6}>
            <Card>
                <Card.Header as="h5">{recipe.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>Recipe type: {recipe.type}</Card.Title>
                        <Card.Text>
                            Cooking Time {recipe.cook_time}
                            <br/>
                            Created at: {new Date(recipe._kmd.ect).toLocaleDateString()}
                        </Card.Text>
                        <ButtonToolbar>
                        <NavLink to="/">
                            <Button className="mx-2" variant="outline-info">
                                    View
                            </Button>
                        </NavLink>
                        <NavLink to={updateRoute(recipe._id)}>
                            <Button className="mx-2" variant="outline-success">Update</Button>
                        </NavLink>
                        <Button onClick={() => deleteRecipe(recipe._id)} className="mx-2" variant="outline-danger">Delete</Button>
                        </ButtonToolbar>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )) : (<h2>Loading...</h2>)

    return (
        <Container className="mt-3">
            {userRecipes}
        </Container>
    )
}

export default UserRecipes;