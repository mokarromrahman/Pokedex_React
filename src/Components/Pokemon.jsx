import React, { useState, useEffect } from "react";
import { Carousel, Row, CardColumns, Button, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
//Component which will be used to render a single pokemon
export default function Pokemon({ number }) {
  const [data, setData] = useState(null);
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
      <>
        <Container>
          <h1>{capitalizeName(data.name)}</h1>
          <PicSlideShow spritesDescUrlArray={spritesArray} />

          {/* {Object.values(data.sprites).map((url, i) => (
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
          ))} */}

          {/* <PokemonForms spritesUrlArray={data.sprites} /> */}
        </Container>
      </>
    );
  }
  return <div>{number} not found.</div>;
}

function PicSlideShow({ spritesDescUrlArray }) {
  const [sprites, setSprites] = useState(spritesDescUrlArray);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
  // useEffect(() => {
  //   console.log(sprites);
  //   console.log(currentSpriteIndex);
  //   console.log(sprites.length);
  // }, []);
  return (
    <Container>
      <Row>
        <img
          src={sprites[currentSpriteIndex].url}
          alt={sprites[currentSpriteIndex].description}
        ></img>
        {/* {JSON.stringify(currentSprite)} */}
      </Row>
      <Row>
        <label>{sprites[currentSpriteIndex].description}</label>
      </Row>
      <Row>
        <Button
          onClick={() =>
            currentSpriteIndex === 0
              ? setCurrentSpriteIndex(sprites.length - 1)
              : setCurrentSpriteIndex(currentSpriteIndex - 1)
          }
        >
          <ArrowLeft></ArrowLeft>
        </Button>

        <Button
          onClick={() =>
            currentSpriteIndex === sprites.length - 1
              ? setCurrentSpriteIndex(0)
              : setCurrentSpriteIndex(currentSpriteIndex + 1)
          }
        >
          <ArrowRight></ArrowRight>
        </Button>
      </Row>
    </Container>
  );
}
// export function PokemonForms(spritesUrlArray) {
//   const [urls, setUrls] = useState([]);
//   // useEffect(console.log(Object.values(spritesUrlArray)), []);
//   useEffect(
//     Object.values(spritesUrlArray).map((u) =>
//       Object.values(u) === "null"
//         ? console.log("I was null")
//         : console.log(Object.values(u))
//     ),
//     [spritesUrlArray]
//   );

//   return <h1>Hello</h1>;
// }
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
          description: Object.keys(spritesArray)[i].toString(),
          url: u,
        })
      : ""
  );

  return retArray;
}

//July 7, 2020: there seems to be an issue here so come back to this
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
