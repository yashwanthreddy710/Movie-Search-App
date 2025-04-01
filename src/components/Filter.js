function Filter({ filter, onFilterChange }) {
    return (
      <select 
        value={filter} 
        onChange={(e) => onFilterChange(e.target.value)}
        className="border p-2 rounded bg-black text-white hover:text-amber-500 cursor-pointer"
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </select>
    );
  }

  export default Filter;