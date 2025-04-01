import { Link } from 'react-router-dom';

function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <h1 className='text-2xl text-center mt-10'>No movies found</h1>;
    }

    return (
        <div className='text-white flex flex-wrap justify-center gap-10 mt-5  sm:grid grid-cols-2 lg:grid-cols-3 xl:flex flex-wrap'>
            {movies.map((movie) => (
                <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                    <div className='mb-8 w-80 h-140 text-center rounded-md overflow-hidden shadow-lg bg-gray-800 p-3 sm:w-75 md:w-85 lg:w-80'>
                        {movie.Poster !== "N/A" && ( 
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className='w-full h-96 object-cover'
                            />
                        )}
                        <div className='mt-2'>
                            <h2 className='text-xl font-semibold'>{movie.Title}</h2>
                            <p className='text-lg'>{movie.Year}</p>
                            <p className='text-lg'>{movie.Type}</p>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    );
}

export default MovieList;