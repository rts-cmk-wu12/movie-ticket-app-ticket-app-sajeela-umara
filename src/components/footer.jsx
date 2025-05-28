import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdDoNotDisturbOn } from "react-icons/md";
import { BsBookmark, BsFillPersonFill } from "react-icons/bs";

const Footer = () => {
  const [hasBookmarks, setHasBookmarks] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedMovies") || "[]");
    setHasBookmarks(bookmarks.length > 0);
  }, []);

  return (
    <div className="footer">
      <Link to="/"><GoHomeFill size={40} /></Link>
      <Link to="/ExploreMovie"><MdDoNotDisturbOn size={40} color="lightgrey" /></Link>
      
      {/* ✅ Bookmark icon updates dynamically */}
      <Link to="/bookmarks">
        <BsBookmark size={40} color={hasBookmarks ? "blue" : "lightgrey"} />
      </Link>
      
      <BsFillPersonFill size={40} />
    </div>
  );
};

export default Footer;
