import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/footer.jsx";
import { CiSearch } from "react-icons/ci";

const ExploreMovie = () => {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false); // Toggle state

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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzZjZTNlNzc3OWM0NmM2YWE0NGRiOGQ1NzFiZDMzZCIsIm5iZiI6MTczNjc1NTk5MC4wODYwMDAyLCJzdWIiOiI2Nzg0Y2IxNmFiYWJiYmEwNDBiYjc0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BXEotnU2oQlH1c1I7xwdpCK6bOAQwwP6lkVZDN_wCb4'
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

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedMovies = showAll ? filteredMovies : filteredMovies.slice(0, 5);
  const displayedRecommendations = showAllRecommendations
    ? recommendedMovies
    : recommendedMovies.slice(0, 5);

  return (

    <div className="explore-container">
      <div className="explore-header">
<button className="back-arrow" onClick={() => navigate('/')} aria-label="Go to homepage">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
</button>
<h2>Explore Movie</h2>


    
        
        <div className="search-wrapper_explore">
          {showSearchInput && (
            <input
              type="text"
              className="search-input_explore"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <i className="search-icon_explore" onClick={() => setShowSearchInput(!showSearchInput)}>
            <CiSearch />
          </i>
        </div>
      </div>

      <div className="toggle-tabs">
        <div className="toggle-tab active">Now Showing</div>
        <Link to="/" className="toggle-tab">
          Upcoming
        </Link>
      </div>

      <section>
        <div className='section-title-first'>
          <h2 className="section-title">Top Movies</h2>
          {filteredMovies.length > 6 && (
            <div className="see-more-explore" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'See Less' : 'See More'}
            </div>
          )}
        </div>

        <div className="movies-grid">

          {displayedMovies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movies/${movie.id}`} >
                <img className='movie-poster'
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
              </Link>
            </div>

          ))}
        </div>
      </section>
      <section>
        {recommendedMovies.length > 0 && (
          <>
            <div className='section-title-first'>
              <h2 className="section-title">Recommended</h2>
              {recommendedMovies.length > 6 && (
                <div className="see-more-explore" onClick={() => setShowAllRecommendations(!showAllRecommendations)}>
                  {showAllRecommendations ? 'See Less' : 'See More'}
                </div>
              )}
            </div>

            <div className="movies-grid">
              {displayedRecommendations.map(movie => (
                <div className="movie-card-recommended" key={movie.id}>
                  <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <img
                      src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/200x300?text=No+Image'}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                    <p>⭐ {movie.vote_average}</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ExploreMovie;
