import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export function Recette() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  function handleLogout() {
    // Suppression des informations de connexion du localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // Redirection vers la page de connexion
    navigate('/');
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Se déconnecter</button>
          <IngredientList/>
        </div>
      ) : (
        <p>Vous devez être connecté pour accéder à cette page.</p>
      )}
    </div>
  );
}

const ingredientsList = [
  { name: 'Farine' },
  { name: 'Sucre' },
  { name: 'Oeufs' },
  { name: 'Lait' },
];

const IngredientList = () => {
  const [currentIngredient, setCurrentIngredient] = useState(null);

  return (
    <div>
      <ul>
        {ingredientsList.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.name}
            <button onClick={() => setCurrentIngredient(ingredient)}>Voir la recette</button>
          </li>
        ))}
      </ul>

      {currentIngredient && (
        <div>
          <h2>{currentIngredient.name}</h2>
          <p>Description de la recette...</p>
        </div>
      )}
    </div>
  );
};


