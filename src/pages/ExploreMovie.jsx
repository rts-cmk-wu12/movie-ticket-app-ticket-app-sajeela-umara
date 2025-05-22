

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/footer.jsx";

const ExploreMovie = () => {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzZjZTNlNzc3OWM0NmM2YWE0NGRiOGQ1NzFiZDMzZCIsIm5iZiI6MTczNjc1NTk5MC4wODYwMDAyLCJzdWIiOiI2Nzg0Y2IxNmFiYWJiYmEwNDBiYjc0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BXEotnU2oQlH1c1I7xwdpCK6bOAQwwP6lkVZDN_wCb4'
          }
        };

        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch top-rated movies');
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);

        if (data.results.length > 0) {
          fetchRecommendations(data.results[0].id);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchRecommendations = async (movieId) => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzZjZTNlNzc3OWM0NmM2YWE0NGRiOGQ1NzFiZDMzZCIsIm5iZiI6MTczNjc1NTk5MC4wODYwMDAyLCJzdWIiOiI2Nzg0Y2IxNmFiYWJiYmEwNDBiYjc0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BXEotnU2oQlH1c1I7xwdpCK6bOAQwwP6lkVZDN_wCb4'
          }
        };

        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        setRecommendedMovies(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayedMovies = showAll ? movies : movies.slice(0, 6);
  const displayedRecommendations = showAllRecommendations
    ? recommendedMovies
    : recommendedMovies.slice(0, 6);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Top Rated Movies</h1>

      {movies.length > 6 && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {displayedMovies.map(movie => (
          <div key={movie.id} style={{ width: '200px', textAlign: 'center' }}>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img
                src={movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      {recommendedMovies.length > 0 && (
        <>
          <h2>Recommended Movies</h2>

          {recommendedMovies.length > 6 && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                onClick={() => setShowAllRecommendations(prev => !prev)}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'blue',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {showAllRecommendations ? 'See Less' : 'See More'}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {displayedRecommendations.map(movie => (
              <div key={movie.id} style={{ width: '200px', textAlign: 'center' }}>
                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <img
                    src={movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/200x300?text=No+Image'}
                    alt={movie.title}
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                  <h3>{movie.title}</h3>
                  <p>Rating: {movie.vote_average}</p>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
};

export default ExploreMovie;

