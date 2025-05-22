
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ExploreMovie from './pages/ExploreMovie.jsx';
import MovieDetail from './pages/MovieDetails.jsx';
import BookTicket from './pages/BookTicket.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ETicketPage from './pages/ETicketPage.jsx';
import BookmarksPage from './pages/BookmarksPage.jsx';
 import SearchResults from './pages/SearchResults.jsx';

import './App.css';
import './style/BookTicket.css';
import './style/CheckoutPage.css';
 import './style/pop-up.css';
 import './style/eticket.css';
 import './style/ticket-popup.css';
 import './style/bookmark.css';

function App() {

 
  return (
    <Router>
      
        
      
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/ExploreMovie" element={<ExploreMovie />} />
  <Route path="/movies/:movieId" element={<MovieDetail />} />
  <Route path="/book-ticket/:movieId" element={<BookTicket />} />
  <Route path="/BookTicket" element={<BookTicket />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/eticket" element={<ETicketPage />} />
    <Route path="/bookmarks" element={<BookmarksPage />} />
     <Route path="/search" element={<SearchResults />} />
</Routes>

   
  </Router>

  );
};
 
export default App;