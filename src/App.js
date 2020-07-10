import React from "react";
import { useState, useEffect } from "react";
import Pokemon from "./Components/Pokemon.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

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

  return pokemonList ? (
    <>
      <Row md={5}>
        {pokemonList.map((p) => (
          <Pokemon name={p} />
        ))}
      </Row>
      {/* <Row>
        <Col>
          <Button onClick={setCurrentUrl(previousURL)}>
            <ArrowLeft></ArrowLeft>
          </Button>
        </Col>
        <Col>
          <Button onClick={setCurrentUrl(nextUrl)}>
            <ArrowRight></ArrowRight>
          </Button>
        </Col>
      </Row> */}
    </>
  ) : (
    <div>Nothing here</div>
  );
}

export default App;
