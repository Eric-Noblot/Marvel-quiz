import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// (oldV7) import Firebase from "./components/Firebase"
// (oldV7) import FirebaseContext from "./components/Firebase/context"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // (oldV7) <FirebaseContext.Provider value={new Firebase()}>
    <App />
  // (oldV7) </FirebaseContext.Provider>
);


//dans ce projet on utilise Firebase. J'ai dabord suivi le cours en codant avec la version 7 de firebase, qui ne comprend
// pas le fonctions, les hooks... et qui utilisent dont les class et la Popover//
//Ensuite je suis passé à la V9 de fire base et jai donc effctué des modifications.
//tous les dossiers (old) sont des dossiers utilisés pour les class et la V7
//on notera que dans le dossier Firebase, on utilisait 3 fichiers poiur le V7 et seulement un pour la V9
//j'ai aussi copié le bouton signUp et signUp(old) afin de pouvoir garder les 2 méthodes d'inscription