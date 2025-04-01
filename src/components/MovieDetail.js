import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../api";

function MovieDetail({ favorite, addToFavorite }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const movieDetail = async () => {
            try {
                setLoading(true);
                const data = await MovieDetails(id);
                setMovie(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        movieDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Movie not found.</div>;

    const isFavorite = favorite.some((fav) => fav.imdbID === movie.imdbID);

    return (
        <div className="p-5">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com"}
                alt={movie?.Title || "No title available"}
                className="w-full max-w-sm mx-auto rounded"
            />
            <div className=" mt-5 p-10 text-center">
                <h2 className="text-2xl font-bold">{movie?.Title}</h2>
                <p><span className="font-bold">Year:</span> {movie?.Year}</p>
                <p><span className="font-bold">Genre:</span> {movie?.Genre}</p>
                <p><span className="font-bold">Director: </span>{movie?.Director}</p>
                <p><span className="font-bold">Actors:</span> {movie?.Actors}</p>
                <p><span className="font-bold">Plot:</span> {movie?.Plot}</p>
                <button
                    onClick={() => addToFavorite(movie)}
                    className={`mt-3 py-2 px-4 rounded ${isFavorite ? "bg-gray-500" : "bg-amber-500 hover:bg-amber-400"} text-black`}
                >
                    {isFavorite ? "Already in Favorite" : "Add to Favorite"}
                </button>
            </div>
        </div>
    );
}

export default MovieDetail;