import React, { useContext, useEffect } from 'react';
import { fetchAllRecipes } from '../../api/recipes';
import { RecipeContext } from '../../contexts/Recipe';
//import { UserContext } from '../../contexts/User';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {

    const { recipes, getAllRecipes, clearAllRecipes } = useContext(RecipeContext);
    //const { user } = useContext(UserContext);

 //console.log(user)
    useEffect(() => {
        fetchAllRecipes()
            .then(allRecipes => {
                getAllRecipes(allRecipes)
            })
            .catch(err => {throw err})
    }, [])

    useEffect(() => {
        return () => {
            clearAllRecipes()
        }
    }, [])

    const recipeGallery = recipes!==null ?
    recipes.map(recipe => (
        <Col xs={12} sm={6} md={4} lg={4} key={recipe._id}>
            <Card>
                <Card.Img variant="top" src={recipe.imgUrl} />
                <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>
                        {recipe.type}
                    </Card.Text>
                    <Button variant="outline-info">View Recipe</Button>
                </Card.Body>
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