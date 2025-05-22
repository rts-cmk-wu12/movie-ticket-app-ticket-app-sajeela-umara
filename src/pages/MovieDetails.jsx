


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=videos`;
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
    fetchCast(movieId);
  }, [movieId]);

  const fetchCast = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization:  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzZjZTNlNzc3OWM0NmM2YWE0NGRiOGQ1NzFiZDMzZCIsIm5iZiI6MTczNjc1NTk5MC4wODYwMDAyLCJzdWIiOiI2Nzg0Y2IxNmFiYWJiYmEwNDBiYjc0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BXEotnU2oQlH1c1I7xwdpCK6bOAQwwP6lkVZDN_wCb4'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch cast');
      const data = await response.json();
      setCast(data.cast || []);
    } catch (err) {
      console.error(err.message);
    }
  };

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

  function convertMinutesToHoursAndMinutes(minutes) {
    if (!minutes && minutes !== 0) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return movie ? (
    <div className="movie-detail">
      {/* ✅ Trailer Section Fixed */}
      <div className="video">
        {movie.videos?.results?.length > 0 ? (
          <iframe
            width="1000"
            height="300"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            title={movie.title}
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available.</p>
        )}
      </div>

      {/* ✅ Bookmark Section Fixed */}
      <div className='bookmark-section'>
        <div>
          <h2>{movie.title}</h2>
          <p><CiStar /> {Math.round(movie.vote_average)}/10 IMDb</p>
        </div>
        <div className='bookmark'>
          <FaRegBookmark
            style={{ color: isBookmarked ? 'blue' : 'grey', cursor: 'pointer', width: '30px', height: '30px' }}
            onClick={toggleBookmark}
          />
        </div>
      </div>

      {/* ✅ Genres Display Fixed */}
      <div>
        {movie.genres?.map(genre => (
          <span key={genre.id} className='genre-box'>{genre.name}</span>
        ))}
      </div>

      {/* ✅ Movie Details Section */}
      <div className='moviedetail-info'>
        <div>
          <p>LENGTH</p>
          <p>{convertMinutesToHoursAndMinutes(movie.runtime)}</p>
        </div>
        <div>
          <p>LANGUAGE</p>
          <p>{movie.spoken_languages?.[0]?.name || 'N/A'}</p>
        </div>
        <div>
          <p>RATING</p>
          <p>{movie.adult ? '18+' : 'PG-13'}</p>
        </div>
      </div>

      <p>{movie.overview}</p>

      {/* ✅ Cast Section Fixed */}
      <h1>Cast</h1>
      <div className='moviedetail-cast'>
        {cast.length > 0 ? (
          cast.map(castMember => (
            <div key={castMember.id} className='cast-box'>
              <img
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${castMember.profile_path}`
                    : 'https://via.placeholder.com/100x150?text=No+Image'
                }
                alt={castMember.original_name}
                className="cast-pic"
              />
              <span>{castMember.original_name}</span>
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>

      {/* ✅ Book Ticket Button Fixed */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => navigate(`/book-ticket/${movieId}`)}
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '12px 30px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Book Ticket
        </button>
      </div>
    </div>
  ) : null;
};

export default MovieDetails;
