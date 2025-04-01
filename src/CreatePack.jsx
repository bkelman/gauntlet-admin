import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";

function CreatePack() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(collection(db, "NFLplayers"), orderBy("difficulty"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        difficulty: doc.data().difficulty,
      }));
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const togglePlayerSelection = (id) => {
    setSelectedPlayerIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      } else if (prev.length < 10) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCreatePack = async () => {
    if (selectedPlayerIds.length !== 10 || !date) {
      alert("Please select 10 players and enter a date.");
      return;
    }

    const dateString = date.replace(/-/g, ""); // Format YYYYMMDD

    await setDoc(doc(db, "NFLpacks", dateString), {
      date: dateString,
      playerIds: selectedPlayerIds,
    });

    alert("Pack created!");
    setSelectedPlayerIds([]);
    setDate("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ color: "white" }}>Create a New Pack</h2>

      <label style={{ color: "white" }}>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: "1rem", display: "block" }}
      />

      <h4 style={{ color: "white" }}>Select 10 Players:</h4>
      <ul style={{ maxHeight: 300, overflowY: "scroll", padding: 0 }}>
        {players.map((player) => (
          <li
            key={player.id}
            onClick={() => togglePlayerSelection(player.id)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedPlayerIds.includes(player.id)
                ? "#fe5a1d"
                : "#333",
              color: "white",
              padding: "6px 10px",
              marginBottom: 4,
              borderRadius: 4,
              listStyle: "none",
            }}
          >
            {player.name} (Difficulty {player.difficulty})
          </li>
        ))}
      </ul>

      <button
        onClick={handleCreatePack}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#3b7080",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Create Pack
      </button>
    </div>
  );
}

export default CreatePack;
