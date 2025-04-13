import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [preferences, setPreferences] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary("");

    try {
      const response = await fetch("https://tripease-backend.onrender.com/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, budget, days, preferences }),
      });

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setItinerary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>TripEase Itinerary Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination:</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Budget:</label>
          <input value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </div>
        <div>
          <label>Number of Days:</label>
          <input value={days} onChange={(e) => setDays(e.target.value)} required />
        </div>
        <div>
          <label>Preferences:</label>
          <input value={preferences} onChange={(e) => setPreferences(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>

      {itinerary && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h2>Your Itinerary:</h2>
          <p>{itinerary}</p>
        </div>
      )}
    </div>
  );
}

export default App;