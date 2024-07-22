import React from 'react';
import { Link } from 'react-router-dom';

const MyTeam = ({ team, removeFromTeam }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6 md:p-10 lg:p-16">
      <h1 className="text-5xl font-bold text-white mb-8 text-center">My Pokémon Team</h1>
      {team.length === 0 ? (
        <p className="text-white text-lg text-center">No Pokémon in your team</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map(pokemon => (
            <div key={pokemon.id} className="bg-white rounded-lg shadow-lg p-6 mb-4 text-center">
              <h2 className="text-3xl font-semibold">{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto mb-2 w-32 h-32 md:w-48 md:h-48" />
              <button 
                onClick={() => removeFromTeam(pokemon.id)} 
                className="mt-2 bg-red-600 text-white font-semibold py-1 px-2 rounded shadow hover:bg-red-700 transition duration-200"
                aria-label={`Remove ${pokemon.name} from team`}
              >
                Remove
              </button>
              <Link to={`/pokemon/${pokemon.name}`} className="mt-2 mx-4 text-blue-600 hover:underline text-lg">View Details</Link>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 text-center">
        <Link to="/" className="text-white hover:underline text-lg">Back to Home</Link>
      </div>
    </div>
  );
};

export default MyTeam;