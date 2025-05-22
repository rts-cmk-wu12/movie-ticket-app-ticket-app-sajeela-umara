import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer.jsx";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const QUERY = `[out:json];
  node["amenity"="cinema"](55.5419,11.9804,55.8419,12.2804);
  out;`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch upcoming movies
    fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching movies:", err));

    // Fetch nearby cinemas
    fetch(`${OVERPASS_URL}?data=${encodeURIComponent(QUERY)}`)
      .then((res) => res.json())
      .then((data) => setCinemas(data.elements))
      .catch((err) => console.error("Error fetching cinemas:", err));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome back, <span className="username">User</span></h1>
        <img className="profile-pic" src="profile.jpg" alt="Profile" />
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies, cinemas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <section className="coming-soon">
        <h2>Coming Soon</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cinema-near-you">
        <h2>Cinema Near You</h2>
        {cinemas.length > 0 ? (
          <div className="cinema-list">
            {cinemas.map((cinema, index) => {
              const cinemaName = cinema.tags?.name || "Unknown Cinema";
              const cinemaImageUrl = `https://source.unsplash.com/300x200/?cinema,${encodeURIComponent(cinemaName)}`;

              return (
                <div key={index} className="cinema-card">
                  <img src={cinemaImageUrl} alt={cinemaName} className="cinema-logo" />
                  <div className="cinema-info">
                    <p><strong>Distance:</strong> {Math.floor(Math.random() * 10) + 1} km</p>
                    <h3>{cinemaName}</h3>
                    <p><strong>Closing Time:</strong> {cinema.tags?.opening_hours || "Not Available"}</p>
                  </div>
                  <div className="rating-container">
                    <p><strong>Rating:</strong> ★★★★☆ </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No cinemas found. Try adjusting your location settings!</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
