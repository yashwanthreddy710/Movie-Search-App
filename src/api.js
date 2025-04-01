import axios from 'axios';

const API_KEY="44505c23";
const API_URL="https://www.omdbapi.com/";

export const SearchMovies=async(searchterm,type="",page = 1) =>{
    try {
        const response = await axios.get(`${API_URL}?s=${searchterm}&type=${type}&page=${page}&apikey=${ API_KEY}`);
        const data = response.data;
        return data;

     } catch (error) {
        console.error("Error Fetching Movie Data",error);
        return []
     }
}

export const MovieDetails=async(id) =>{
    try {
        const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error Fetching Movie Data",error);
        return []
    }
}