import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/connexion';
import {Recette} from './components/recette';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Connexion </Link>
        <Link to="/recette"> Liste des recettes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recette" element={<Recette />} />
      </Routes>  
    </div>
  );
}

export default App;
