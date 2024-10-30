import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie._id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <button onClick={() => window.open(movie.url)}>Stream</button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
