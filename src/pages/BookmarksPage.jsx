import React, { useEffect, useState } from "react";

const BookmarksPage = () => {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarkedMovies") || "[]");

        const fetchMovieDetails = async () => {
            try {
                const movieRequests = bookmarks.map((movieId) =>
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                        headers: {
                            accept: "application/json",
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzZjZTNlNzc3OWM0NmM2YWE0NGRiOGQ1NzFiZDMzZCIsIm5iZiI6MTczNjc1NTk5MC4wODYwMDAyLCJzdWIiOiI2Nzg0Y2IxNmFiYWJiYmEwNDBiYjc0YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BXEotnU2oQlH1c1I7xwdpCK6bOAQwwP6lkVZDN_wCb4'
                        }
                    }).then((res) => res.json())
                );

                const movieData = await Promise.all(movieRequests);
                setBookmarkedMovies(movieData);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        if (bookmarks.length > 0) {
            fetchMovieDetails();
        }
    }, []);

    const handleRemoveBookmark = (movieId) => {
        const updatedBookmarks = bookmarkedMovies.filter(movie => movie.id !== movieId);
        setBookmarkedMovies(updatedBookmarks);
        localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks.map(movie => movie.id))); // ✅ Update localStorage
    };

    return (
        <div className="bookmarks-container">
            <h1>📌 Your Bookmarked Movies</h1>
            {bookmarkedMovies.length > 0 ? (
                <div className="movies-grid">
                    {bookmarkedMovies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                            <button className="cancel-btn" onClick={() => handleRemoveBookmark(movie.id)}>❌ Cancel</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No movies bookmarked yet.</p>
            )}
        </div>
    );
};

export default BookmarksPage;
