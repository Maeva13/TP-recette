import React, { useEffect, useState } from 'react';
import { Directus } from '@directus/sdk';

export function Recette() {
  return (
    <div>
      <RecetteList/> 
    </div>
  );
}

function RecetteList() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const directus = new Directus('http://localhost:8055');
    directus.items('recipe').readByQuery({
      fields: [
        "name",
        "instruction",
        "Image",
        "ingredients.quantity",
        "ingredients.ingredient_id.name",
        "ingredients.ingredient_id.unit.iso",
      ],
      limit: 5
    })
    .then(({ data }) => {
      setRecipes(data.map(recipe => ({
        name: recipe.name,
        instruction : recipe.instruction,
        image : recipe.Image,
        ingredients: recipe.ingredients.map(ingredient => ({
          name: ingredient.ingredient_id.name,
          amount: ingredient.quantity + ' ' + (ingredient.ingredient_id.unit.iso || '')
        }))
      })));
    })
  }, [])

  const [currentRecipe, setCurrentRecipe] = useState(null); // Etat de la recette sélectionnée 
  const [currentIngredient, setCurrentIngredient] = useState(null); // Etat de l'ingrédient  sélectionné 

  const RecetteClick = (recipe) => {
    setCurrentRecipe(recipe); // Mettre à jour l'état de la recette sélectionnée 
  };

  const IngredientClick = (index) => {
    setCurrentIngredient(index); // Mettre à jour l'état de l'ingrédient sélectionné 
  };

  const IngredientEdit = (recipeIndex, ingredientIndex, newAmount) => {
    const updatedRecipes = [...recipes]; // Création d'une copie de l'état des recettes
    updatedRecipes[recipeIndex].ingredients[ingredientIndex].amount = newAmount; // Modification de la quantité de l'ingrédient sélectionné 
    setRecipes(updatedRecipes);
  };
  
// Réinitialisation de l'index de l'ingrédient en cours d'édition
  const IngredientSave = () => {
    setCurrentIngredient(null);
  };

  return ( // Affichage de la liste des recettes
    <div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.name}>
            {recipe.name}
            {' '} 
            <button onClick={() => RecetteClick(recipe)}>Voir la recette</button>
          </li>
        ))}
      </ul>

      {currentRecipe && ( // Affichage de la recette sélectionnée
        <div>
          <h2>{currentRecipe.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: currentRecipe.instruction }} />
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => ( // Affichage de la liste des ingrédients de la recette
              <li key={ingredient.name}>
                {index === currentIngredient ? (
                  <div>
                    <input
                      type="text"
                      value={ingredient.amount}
                      onChange={(e) =>
                        IngredientEdit(
                          recipes.indexOf(currentRecipe),
                          index,
                          e.target.value
                        )
                      }
                    />
                    <button onClick={IngredientSave}>Enregistrer</button>
                  </div>
                ) : (
                  <div>
                    {ingredient.name}: {ingredient.amount} 
                    {' '} 
                    <button onClick={() => IngredientClick(index)}>Editer</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <img src={currentRecipe.image} />
        </div>
      )}
    </div>
  );
};



