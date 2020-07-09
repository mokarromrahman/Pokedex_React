import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextURL] = useState("");
  const [previousURL, setPreviousURL] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
