import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification des informations de connexion
    if (email === 'user@user.fr' && password === 'user') {
      // Stockage des informations de connexion dans le localStorage
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userEmail', email);
      // Redirection vers la page de profil
      navigate('/recette'); 
    } else {
      alert('Adresse e-mail ou mot de passe incorrect');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Adresse e-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
