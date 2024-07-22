import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = ({ addToTeam, team, notification }) => {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRandomPokemon = async () => {
    setError('');
    setLoading(true);
    const randomId = Math.floor(Math.random() * 800) + 1;
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setPokemon(result.data);
    } catch (err) {
      setError('Failed to fetch random Pokémon');
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonByName = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      setPokemon(result.data);
    } catch (err) {
      setError('Pokémon not found');
    } finally {
      setLoading(false);
    }
  };

  const isInTeam = pokemon && team.some(p => p.id === pokemon.id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6 md:p-10 lg:p-16">
      <h1 className="text-5xl font-bold text-white mb-8 text-center">Pokémon Search</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6 w-full lg:w-auto">
        <button 
          onClick={fetchRandomPokemon} 
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-blue-100 transition duration-200 w-full md:w-auto"
        >
          Random Pokémon
        </button>
        <form onSubmit={fetchPokemonByName} className="flex w-full mt-4 md:mt-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Pokémon name"
            className="px-4 py-3 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button 
            type="submit" 
            disabled={!search}
            className={`bg-white text-blue-600 font-semibold py-3 px-6 rounded-r shadow hover:bg-blue-100 transition duration-200 ${!search ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Search
          </button>
        </form>
      </div>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {pokemon && (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-3xl font-semibold">{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto mb-4 w-32 h-32 md:w-48 md:h-48" />
          <Link to={`/pokemon/${pokemon.name}`} className="text-blue-600 mx-4 hover:underline">View Details</Link>
          {isInTeam ? (
            <button 
              onClick={() => removeFromTeam(pokemon)} 
              className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-700 transition duration-200"
            >
              Remove from Team
            </button>
          ) : (
            <button 
              onClick={() => addToTeam(pokemon)} 
              className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-200"
            >
              Add to Team
            </button>
          )}
        </div>
      )}
      <Link to="/my-team" className="mt-6 text-white hover:underline text-lg">View My Pokémon Team</Link>
    </div>
  );
};

export default Home;
