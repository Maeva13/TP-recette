import { Link, Routes, Route } from 'react-router-dom';
import Login from './components/connexion';
import {Recette} from './components/recette';

function App() {
  return (
    <div id="app">
      <nav>
        <Link to="/login">Connexion </Link>
        <Link to="/recette"> Liste des recettes</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recette" element={<Recette />} />
      </Routes>  
    </div>
  );
}

export default App;
