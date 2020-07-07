import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Container } from "react-bootstrap";

//Component which will be used to render a single pokemon
export default function Pokemon({ number }) {
  const [data, setData] = useState(null);
  const [sprites, setSprites] = useState([]);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error());
  }, [number]); //im not sure that the 2nd arguement is doing anything but it got rid of a warning

  //data was found for this pokemon
  if (data) {
    //find all the sprites and the names of each sprite normalized names
    const spritesArray = getSpriteArray(data.sprites);
    console.log(spritesArray);
    return (
      // <div>
      //   <h1>{CapitalizeName(data.name)}</h1>

      //   {Object.values(data.sprites).map((url, i) => (
      //     <>{url ? <PokePic picURL={url} /> : ""}</> //display non null images
      //   ))}
      // </div>
      <Container>
        <h1>{capitalizeName(data.name)}</h1>

        {Object.values(data.sprites).map((url, i) => (
          <>
            {url ? (
              <>
                <PokePic picURL={url} />{" "}
                <label>{Object.keys(data.sprites)[i]}</label>
              </>
            ) : (
              ""
            )}
          </> //display non null images
        ))}

        {/* <PokemonForms spritesUrlArray={data.sprites} /> */}
      </Container>
    );
  }
  return <div>{number} not found.</div>;
}

export function PokemonForms(spritesUrlArray) {
  const [urls, setUrls] = useState([]);
  // useEffect(console.log(Object.values(spritesUrlArray)), []);
  useEffect(
    Object.values(spritesUrlArray).map((u) =>
      Object.values(u) === "null"
        ? console.log("I was null")
        : console.log(Object.values(u))
    ),
    [spritesUrlArray]
  );

  return <h1>Hello</h1>;
}
function PokePic({ picURL }) {
  return <img src={picURL} />;
}
function capitalizeName(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function getSpriteArray(spritesArray) {
  let retArray = [];
  Object.values(spritesArray).map((u, i) =>
    u
      ? retArray.push({
          description: normalizeDescriptions(
            Object.keys(spritesArray)[i].toString()
          ),
          url: u,
        })
      : ""
  );

  return retArray;
}

function normalizeDescriptions({ description }) {
  const desc =
    capitalizeName(description.slice(0, description.indexof("_"))).toString() +
    " " +
    capitalizeName(
      description
        .slice(description.indexof("_") + 1, description.len)
        .toString()
    );
  return desc;
}
