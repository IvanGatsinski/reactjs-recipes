import React, { useContext, useEffect } from 'react';
import { fetchAllRecipes } from '../../api/recipes';
import { RecipeContext } from '../../contexts/Recipe';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const { recipes, setRecipes } = useContext(RecipeContext);

    const viewRoute = recipeId => `/recipe/${recipeId}/view`;

    useEffect(() => {
        fetchAllRecipes()
            .then(({ data }) => {
                setRecipes(data)
            })
            .catch(err => {throw err})
    }, []);

    useEffect(() => {
        return () => setRecipes(null);
    }, []);

    const recipeGallery = recipes !== null ?
    recipes.map(recipe => (
        <Col xs={12} sm={6} md={4} lg={4} key={recipe._id}>
            <Card>
                <Card.Img variant="top" src={recipe.imgUrl} />
                <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>
                        {recipe.type}
                    </Card.Text>
                    <NavLink to={viewRoute(recipe._id)}>
                            <Button className="mx-2" variant="outline-info">
                                View Recipe
                            </Button>
                    </NavLink>
                </Card.Body>
                <Card.Footer>
                    Written by <span className="card-author">{recipe.author}</span>
                </Card.Footer>
            </Card>
        </Col>
    )) : (<h2>Loading...</h2>)
    
    return (
    <Container className="mt-5">
        <Row>
            {recipeGallery}
        </Row>
    </Container>
    )
}

export default Home