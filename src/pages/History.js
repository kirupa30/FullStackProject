import "../styles/History.css";
import React, { useEffect, useState } from "react";
import API from "../api";

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/auth/get-history").then(res => {
      setItems(res.data.history);
    });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign:"center" }}>Search History</h2>

      {items.map(h => (
        <div key={h._id} style={{ marginBottom:"35px" }}>
          <h3>{h.keyword}</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px"
          }}>
            {h.selectedImages.map((img, i) => (
              <img key={i} src={img} alt="" style={{ width:"100%", borderRadius:"6px" }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
