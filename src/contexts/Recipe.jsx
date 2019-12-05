import React, { useState } from 'react';

export const RecipeContext = React.createContext();

const RecipeProvider = (props) => {

    const [recipes, setRecipes] = useState(null);
    const [recipe, setRecipe] = useState(null);

    return (
        <RecipeContext.Provider 
        value={{recipes, recipe, setRecipe, setRecipes}}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeProvider;