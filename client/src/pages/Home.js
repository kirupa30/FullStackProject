import React, { useState } from "react";
import API from "../api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  const searchImages = async () => {
    if (!query) return;
    const res = await API.get(`/auth/search?query=${query}`);
    setImages(res.data.results);
  };

  const toggleSelect = (url) => {
    if (selected.includes(url)) {
      setSelected(selected.filter(i => i !== url));
    } else {
      setSelected([...selected, url]);
    }
  };

  const saveHistory = async () => {
    await API.post("/auth/save-history", {
      keyword: query,
      images: selected
    });
    alert("Saved Successfully ✅");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Search Images (Unsplash)</h2>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "300px", padding: "10px", fontSize: "18px" }}
        />
        <button onClick={searchImages} style={{ padding: "10px 20px", marginLeft: "10px" }}>Search</button>
        <button onClick={saveHistory} style={{ padding: "10px 20px", marginLeft: "10px" }}>Save</button>

        {/* History Page button */}
        <button
          onClick={() => window.location.href = "/history"}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          History
        </button>
      </div>

      <div style={{
        marginTop: "35px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px"
      }}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt=""
            onClick={() => toggleSelect(img.urls.small)}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: selected.includes(img.urls.small) ? "4px solid red" : "2px solid transparent",
              cursor: "pointer"
            }}
          />
        ))}
      </div>
    </div>
  );
}
