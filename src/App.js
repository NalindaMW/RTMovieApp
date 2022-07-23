import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://swapi.py4e.com/api/films/?format=json"
      );
      const movieResult = response.data.results;
      const transformedMovies = movieResult.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  }

  let content = <p>No Movies Found.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>Something went wrong!</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
