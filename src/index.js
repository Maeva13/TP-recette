import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import APIConnector from './tools/APIService';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <APIConnector />
    <App/> 
  </BrowserRouter>
);
