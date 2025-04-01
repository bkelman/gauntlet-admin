import React, { useState } from "react";
import AddPlayer from "./AddPlayer";
import CreatePack from "./CreatePack";
import { useAuth } from "./AuthProvider";
import SignIn from "./SignIn";

function App() {
  const [activeView, setActiveView] = useState(null);
  const { user, checkingAuth } = useAuth();
  if (checkingAuth) return null; // or loading spinner

  if (!user) return <SignIn />;

  if (activeView === "addPlayer") {
    return (
      <div style={{ padding: "2rem", color: "#fff", background: "#121212", minHeight: "100vh" }}>
        <button
          onClick={() => setActiveView(null)}
          style={{ marginBottom: "1rem", background: "transparent", border: "none", color: "#aaa", cursor: "pointer" }}
        >
          ← Back
        </button>
        <AddPlayer />
      </div>
    );
  }

  if (activeView === "createPack") {
    return (
      <div style={{ padding: "2rem", color: "#fff", background: "#121212", minHeight: "100vh" }}>
        <h1 style={{ marginBottom: "1rem" }}>Create Daily Pack</h1>
        <CreatePack />
        <button
          onClick={() => setActiveView(null)}
          style={{ marginBottom: "1rem", background: "transparent", border: "none", color: "#aaa", cursor: "pointer" }}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#121212", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "1rem" }}>Gauntlet Admin</h1>
      <p style={{ marginBottom: "2rem" }}>Let’s build this admin portal!</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => setActiveView("addPlayer")}
          style={{ padding: "0.75rem 1.5rem", background: "#1f1f1f", border: "1px solid #444", borderRadius: "4px", color: "#fff" }}
        >
          Add Player
        </button>
        <button
          onClick={() => setActiveView("createPack")}
          style={{ padding: "0.75rem 1.5rem", background: "#1f1f1f", border: "1px solid #444", borderRadius: "4px", color: "#fff" }}
        >
          Create Daily Pack
        </button>
      </div>
    </div>
  );
}

export default App;
