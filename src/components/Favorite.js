import React from "react";
import { Link } from "react-router-dom";

function Favorite({ favorite, removeFromFavorite }) {
  return (
    <div className="p-5 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Favorite Movies</h2>
      {favorite.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15 lg:grid-cols-4 gap-4 xl:flex flex-wrap">
          {favorite.map((movie) => (
            <div key={movie.imdbID} className="border p-4 rounded shadow-lg md:w-60 xl:w-75">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded md:object-contain xl:object-cover"
              />
              
              <h3 className="text-xl  font-semibold mt-2 text-center md:text-lg">{movie.Title}</h3>
              <div className=" flex items-center justify-center "><button
                onClick={() => removeFromFavorite(movie.imdbID)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Remove
              </button></div>
              <Link
                to={`/movie/${movie.imdbID}`}
                className="block text-center text-amber-700 mt-2"
              >
                View Details
                
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;