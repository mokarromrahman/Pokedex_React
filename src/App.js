import React from "react";
import { useState, useEffect } from "react";
import Pokemon from "./Components/Pokemon.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import Pagination from "./Components/Pagination.jsx";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextURL] = useState("");
  const [previousURL, setPreviousURL] = useState("");
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(currentUrl)
      .then((res) => res.json())
      .then((r) => {
        //set the next and current url
        setNextURL(r.next);
        setPreviousURL(r.previous);

        //find the pokemon on this
        //page and set it to the
        //pokemonList state
        let pokesFound = [];
        r.results.map((p) => {
          pokesFound.push(p.name);
        });
        setPokemonList(pokesFound);
      })
      .catch(console.error);
  });

  function originalPage() {
    setCurrentUrl(currentUrl);
  }
  function nextPage() {
    setCurrentUrl(nextUrl);
  }
  function previousPage() {
    setCurrentUrl(previousURL);
  }
  return pokemonList ? (
    <Container fluid>
      <Row md={5}>
        {pokemonList.map((p) => (
          <Pokemon name={p} />
        ))}
      </Row>
      <Pagination
        originalPage={originalPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </Container>
  ) : (
    <div>Nothing here</div>
  );
}

export default App;
