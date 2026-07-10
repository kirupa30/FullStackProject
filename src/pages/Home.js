import "../styles/Home.css";
import React, { useState } from "react";
import API from "../api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  // Search Images
  const searchImages = async () => {
    if (!query) return;

    try {
      const res = await API.get(`/auth/search?query=${query}`);
      setImages(res.data.results);
    } catch (err) {
      console.log(err);
      alert("Error fetching images");
    }
  };

  // Select / Unselect Image
  const toggleSelect = (url) => {
    if (selected.includes(url)) {
      setSelected(selected.filter((img) => img !== url));
    } else {
      setSelected([...selected, url]);
    }
  };

  // Save History
  const saveHistory = async () => {
    try {
      await API.post("/auth/save-history", {
        keyword: query,
        images: selected,
      });

      alert("Saved Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to save history");
    }
  };

  return (
    <div className="container">

      <h1 className="title">IMAGE SEARCHING PAGE</h1>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <div className="button-group">

          <button onClick={searchImages}>
            Search
          </button>

          <button onClick={saveHistory}>
            Save
          </button>

          <button onClick={() => (window.location.href = "/history")}>
            History
          </button>

        </div>

      </div>

      <div className="image-grid">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description || "Unsplash"}
            onClick={() => toggleSelect(img.urls.small)}
            className={
              selected.includes(img.urls.small)
                ? "selected-image"
                : "image-item"
            }
          />
        ))}
      </div>

    </div>
  );
}