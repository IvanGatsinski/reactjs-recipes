import React, { useState } from 'react';

export const RecipeContext = React.createContext();

const RecipeProvider = (props) => {

    const [recipes, setRecipes] = useState(null);

    const getAllRecipes = (allRecipes) => {
        setRecipes(allRecipes.data)
    }
    const clearAllRecipes = () => {
        setRecipes(null)
    }

    return (
        <RecipeContext.Provider 
        value={{recipes, getAllRecipes, clearAllRecipes}}>
            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeProvider;