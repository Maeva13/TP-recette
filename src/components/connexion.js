import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField } from '@mui/material'
import { Directus } from '@directus/sdk';
import "../css/connexion.css"

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const directus = new Directus('http://localhost:8055');
    directus.auth
      .login({email, password})
      .then(({ token }) => {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('authToken', token);
        navigate('/recette')
      })
      .catch(() => {
        alert('Adresse e-mail ou mot de passe incorrect');
      })
  };

  return <Stack className="loginForm" onSubmit={handleSubmit}>
    <TextField label="Email" variant="outlined" onChange={({ target: { value }}) => setEmail(value)} />
    <TextField label="Mot de passe" variant="outlined" type="password" onChange={({ target: { value }}) => setPassword(value)} />
    <Button variant="contained" onClick={handleSubmit}>Se connecter</Button>
  </Stack>
};

export default Login;
