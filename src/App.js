import { Routes, Route } from 'react-router-dom';
import Login from './components/connexion';
import {Recette} from './components/recette';

function App() {


  return (
    <div id="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recette" element={<Recette />} />
      </Routes>  
    </div>
  );
}
export default App;
