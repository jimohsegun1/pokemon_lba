import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = ({ addToTeam, removeFromTeam, team }) => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInTeam = team.some(p => p.name === name);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(result.data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    pokemon && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-400 p-6 md:p-10 lg:p-16">
        <h1 className="text-5xl font-bold text-white mb-8">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-4 w-32 h-32 md:w-48 md:h-48" />
        <p className="text-lg text-white">Height: {pokemon.height}</p>
        <p className="text-lg text-white">Weight: {pokemon.weight}</p>
        {isInTeam ? (
          <button 
            onClick={() => removeFromTeam(pokemon.id)} 
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
        <Link to="/" className="mt-4 text-white hover:underline text-lg">Back</Link>
      </div>
    )
  );
};

export default PokemonDetails;