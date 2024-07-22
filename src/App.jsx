import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonDetails from './components/PokemonDetails';
import MyTeam from './components/MyTeam';
import './App.css';

const App = () => {

  const getInitialTeam = () => {
    const savedTeam = localStorage.getItem('pokemonTeam');
    return savedTeam ? JSON.parse(savedTeam) : [];
  };
  
  const [team, setTeam] = useState(getInitialTeam);

  const [notification, setNotification] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon) => {
    if (team.length < 6) {
      setTeam([...team, pokemon]);
      setNotification('');
      setIsVisible(false);
    } else {
      setNotification('You cannot add more than 6 Pokémon to your team.');
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  const removeFromTeam = (pokemonId) => {
    setTeam(team.filter(p => p.id !== pokemonId));
    setNotification('');
    setIsVisible(false);
  };

  return (
    <Router>
      {isVisible && (
        <div className={`notification ${isVisible ? 'fade-in' : 'fade-out'}`}>
          {notification}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home addToTeam={addToTeam} team={team} notification={notification} />} />
        <Route path="/pokemon/:name" element={<PokemonDetails addToTeam={addToTeam} removeFromTeam={removeFromTeam} team={team} />} />
        <Route path="/my-team" element={<MyTeam team={team} removeFromTeam={removeFromTeam} />} />
      </Routes>
    </Router>
  );
};

export default App;