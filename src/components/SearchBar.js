import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedTerm = searchTerm.trim();
        if (trimmedTerm === "") return; 
        onSearch(trimmedTerm);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-1">
            <input
                type="text"
                placeholder="Search Your Movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border outline-none rounded px-4 py-2 w-60 text-white bg-black"
            />
            <button
                type="submit"
                className="bg-black  hover:text-amber-500 font-bold py-2 px-4 rounded cursor-pointer"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;