import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Filter from "./components/Filter";
import MovieDetail from "./components/MovieDetail";
import Favorite from "./components/Favorite";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SearchMovies } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [, setError] = useState(null);
  const [, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviePerPage = 10;

  // Function to handle searching for movies
  const handleSearch = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const data = await SearchMovies(searchTerm);
      if (data.Search) {
        setMovies(data.Search); 
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load default movies when app starts
  useEffect(() => {
    const loadDefaultMovies = async () => {
      await handleSearch("movies");
    };
    loadDefaultMovies();
  }, [handleSearch]);

  // Handle filter change
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1); 
  };

  // Pagination function
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Add to Favorite
  const addToFavorite = (movie) => {
    setFavorite((prev) => {
      if (!prev.some((fav) => fav.imdbID === movie.imdbID)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  // Remove from Favorite
  const removeFromFavorite = (id) => {
    setFavorite((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  // Filtering 
  const filteredMovies = movies.filter((movie) => { 
    if (filter === "movie") return movie.Type === "movie";
    if (filter === "series") return movie.Type === "series";
    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / moviePerPage)); 
  const indexOfLastMovie = currentPage * moviePerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <>
      <Router>
        <header className="sticky top-0 bg-amber-500 text-white items-center flex flex-wrap flex-col gap-5 justify-between p-4 mb-8 sm:flex-row">
          <h1 className="text-2xl font-bold text-black sm:text-3xl">Movie App</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="flex flex-wrap justify-between gap-5 sm:mx-">
            <Filter filter={filter} onFilterChange={handleFilterChange} />
            <Link to="/favorite">
              <button className="border p-2 rounded text-white bg-black font-bold hover:text-amber-500 cursor-pointer ">
                Favorite ({favorite.length})
              </button>
            </Link>
          </div>
        </header>
        
        <main>
          <div className="container mx-auto p-5">
            <Routes>
              <Route path="/" element={<MovieList movies={currentMovies} />} />
              <Route path="/favorite" element={<Favorite favorite={favorite} removeFromFavorite={removeFromFavorite} />} />
              <Route path="/movie/:id" element={<MovieDetail favorite={favorite} addToFavorite={addToFavorite} />} />
            </Routes>

            {/* Pagination */}
            {filteredMovies.length > moviePerPage && (
              <div className="flex justify-center gap-2 mt-5">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePagination(i + 1)}
                    className={`px-4 py-2 border rounded-full cursor-pointer ${currentPage === i + 1 ? "bg-black text-white" : "bg-white text-black"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>

        <footer className="bg-amber-500 text-black p-5 text-center mt-10">
          <p>&copy;Movie App 2025. All rights reserved.</p>
        </footer>
      </Router>
    </>
  );
}

export default App;