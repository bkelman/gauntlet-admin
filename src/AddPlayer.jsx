import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // adjust path if needed

function AddPlayer() {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const player = {
      name,
      imageURL,
      difficulty: parseInt(difficulty),
    };

    try {
      await addDoc(collection(db, "NFLplayers"), player);
      console.log("✅ Player added:", player);
      setName("");
      setImageURL("");
      setDifficulty(1);
    } catch (error) {
      console.error("❌ Error adding player:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h2>Add Player</h2>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
      </div>
      <div>
        <label>Difficulty (1–10):</label>
        <input type="number" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} min={1} max={10} required />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default AddPlayer;