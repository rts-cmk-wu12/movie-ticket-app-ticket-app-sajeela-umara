

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzZjZTNlNzc3OWM0NmM2YWE0NGRiOGQ1NzFiZDMzZCIsIm5iZiI6MTczNjc1NTk5MC4wODYwMDAyLCJzdWIiOiI2Nzg0Y2IxNmFiYWJiYmEwNDBiYjc0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BXEotnU2oQlH1c1I7xwdpCK6bOAQwwP6lkVZDN_wCb4'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies') || '[]');
    setIsBookmarked(bookmarks.includes(movieId));
  }, [movieId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies') || '[]');
    let updatedBookmarks;
    if (bookmarks.includes(movieId)) {
      updatedBookmarks = bookmarks.filter(id => id !== movieId);
    } else {
      updatedBookmarks = [...bookmarks, movieId];
    }
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const toggleOverview = () => {
    setShowFullOverview(prev => !prev);
  };

  function convertMinutesToHoursAndMinutes(minutes) {
    if (!minutes && minutes !== 0) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const truncatedOverview = movie.overview.length > 200
    ? movie.overview.slice(0, 200) + '...'
    : movie.overview;

  return movie ? (
    <div className="movie-detail">
      <div className='header__section'>

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
        <h2 className='deatail_heading'>Details Movie</h2>
        <div className='bookmark'>
          <FaRegBookmark
            style={{ color: isBookmarked ? 'blue' : 'grey', cursor: 'pointer', width: '30px', height: '30px' }}
            onClick={toggleBookmark}
          />
        
      </div>
    </div>
      

      {/* Movie Poster */ }
  <div className="poster">
    <img
      src={movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image'}
      alt={movie.title}
      style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}
    />
  </div>

  {/* Title and Rating */ }
  <div className='movie__heading'>
    <div>
      <h2>{movie.title}</h2>
      <p>
        <CiStar /> {movie.vote_average ? `${Math.round(movie.vote_average)}/10 IMDb` : 'No Rating'}
      </p>
    </div>
  </div>



  {/* Movie Info */ }
  <div className='moviedetail-info'>
    <div>
      {movie.genres?.map(genre => (
        <span key={genre.id} className='genre-box'>{genre.name}</span>
      ))}
    </div>


    <div>
      <p>LANGUAGE</p>
      <p>{movie.spoken_languages?.[0]?.name || 'N/A'}</p>
    </div>
    <div>
      <p>LENGTH</p>
      <p>{convertMinutesToHoursAndMinutes(movie.runtime)}</p>
    </div>
  </div>

  {/* Overview with Read More / Less */ }
  <div className='movie__info'>
    <p>{showFullOverview ? movie.overview : truncatedOverview}
      {movie.overview.length > 200 && (
        <button onClick={toggleOverview} className="read-more-btn">
          {showFullOverview ? 'Read Less' : 'Read More'}
        </button>
      )}
    </p>


  </div>

  {/* Book Ticket Button */ }
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <button className='movie__bookticket'
      onClick={() => navigate(`/book-ticket/${movieId}`)}
    >
      Book Ticket
    </button>
  </div>
    </div >
  ) : null;
};

export default MovieDetails;
