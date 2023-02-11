import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { API_KEY, API_URL } from "./Api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const searchMovies = async (event) => {
    event.preventDefault();

    const URL = `${API_URL}?api_key=${API_KEY}&query=${query}&language=en-US&include_adult=false`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
   setQuery('');
  };
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name:
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="enter movie title"
          value={query}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          SEARCH
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
