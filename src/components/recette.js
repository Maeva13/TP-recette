import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export function Recette() {
  const navigate = useNavigate(); // Naviguer entre les différentes pages de l'application
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Vérification si l'utilisateur est connecté en récupérant l'information dans le localStorage

  function handleLogout() {
    // Déconnecter l'utilisateur en supprimant les informations de connexion du localStorage et en le redirigeant vers la page de connexion
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/');
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Se déconnecter</button>
          <RecetteList/> 
        </div>
      ) : (
        <p>Vous devez être connecté pour accéder à cette page.</p>
      )}
    </div>
  );
}

const RecetteList = () => {
  const [recipes, setRecipes] = useState([ 
    {
      name: 'Pancakes',
      ingredients: [
        { name: 'Farine', amount: '1 tasse' },
        { name: 'Sucre', amount: '2 cuillères à soupe' },
        { name: 'Oeufs', amount: '2' },
        { name: 'Lait', amount: '1 tasse' },
      ],
    },
    {
      name: 'Gâteau au chocolat',
      ingredients: [
        { name: 'Farine', amount: '2 tasses' },
        { name: 'Sucre', amount: '1 1/2 tasse' },
        { name: 'Oeufs', amount: '4' },
        { name: 'Beurre', amount: '1/2 tasse' },
        { name: 'Cacao en poudre', amount: '3/4 tasse' },
        { name: 'Lait', amount: '1 tasse' },
        { name: 'Levure chimique', amount: '2 cuillères à café' },
      ],
    },
  ]);

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
            <button onClick={() => RecetteClick(recipe)}>Voir la recette</button>
          </li>
        ))}
      </ul>

      {currentRecipe && ( // Affichage de la recette sélectionnée
        <div>
          <h2>{currentRecipe.name}</h2>
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
                    <button onClick={() => IngredientClick(index)}>Editer</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



