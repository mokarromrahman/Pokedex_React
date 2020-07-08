import React, { useState, useEffect } from "react";
import { Container, Row, Image, Button, Col } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import "../styling/style.css";
//types icons came from https://github.com/duiker101/pokemon-type-svg-icons
import bug from "../type_icons/bug.svg";
import dark from "../type_icons/dark.svg";
import dragon from "../type_icons/dragon.svg";
import electric from "../type_icons/electric.svg";
import fairy from "../type_icons/fairy.svg";
import fighting from "../type_icons/fighting.svg";
import fire from "../type_icons/fire.svg";
import flying from "../type_icons/flying.svg";
import ghost from "../type_icons/ghost.svg";
import grass from "../type_icons/grass.svg";
import ground from "../type_icons/ground.svg";
import ice from "../type_icons/ice.svg";
import normal from "../type_icons/normal.svg";
import poison from "../type_icons/poison.svg";
import psychic from "../type_icons/psychic.svg";
import rock from "../type_icons/rock.svg";
import steel from "../type_icons/steel.svg";
import water from "../type_icons/water.svg";

//Component which will be used to render a single pokemon
export default function Pokemon({ number }) {
  const [data, setData] = useState(null);
  const [types, setTypes] = useState([]);
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
    //console.log(spritesArray);  //used in testing

    //Find the types and set the type of this pokemon
    let tempTypes = [];
    Object.values(data.types).map((t) => {
      //setTypes((types) => types.push(t.type.name));
      tempTypes.push(t.type.name);
    });
    //setTypes(tempTypes);
    console.log(types);
    return (
      // <div>
      //   <h1>{CapitalizeName(data.name)}</h1>

      //   {Object.values(data.sprites).map((url, i) => (
      //     <>{url ? <PokePic picURL={url} /> : ""}</> //display non null images
      //   ))}
      // </div>
      <>
        <Container
          //https://stackoverflow.com/questions/36209432/reactjs-add-dynamic-class-to-manual-class-names
          //this can be used to dynamically change the classes
          className="customBorder customBorder-grass"
          style={{ width: "15em" }}
        >
          <Row className="justify-content-md-center">
            <label>{capitalizeName(data.name)}</label>
          </Row>
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
    <>
      <Row className="justify-content-md-center">
        <Col>
          <Button
            size="sm"
            onClick={() =>
              currentSpriteIndex === 0
                ? setCurrentSpriteIndex(sprites.length - 1)
                : setCurrentSpriteIndex(currentSpriteIndex - 1)
            }
          >
            <ArrowLeft></ArrowLeft>
          </Button>
        </Col>

        <Image
          src={sprites[currentSpriteIndex].url}
          alt={sprites[currentSpriteIndex].description}
          fluid
          thumbnail
        ></Image>
        <Col>
          <Button
            size="sm"
            onClick={() =>
              currentSpriteIndex === sprites.length - 1
                ? setCurrentSpriteIndex(0)
                : setCurrentSpriteIndex(currentSpriteIndex + 1)
            }
          >
            <ArrowRight></ArrowRight>
          </Button>
        </Col>

        {/* {JSON.stringify(currentSprite)} */}
      </Row>
      <Row className="justify-content-md-center">
        <label>{sprites[currentSpriteIndex].description}</label>
      </Row>
      {/* <Row className="justify-content-md-center">
        
      </Row> */}
    </>
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
  Object.values(spritesArray).map((u, i) =>
    u ? normalizeDescriptions(Object.keys(spritesArray)[i].toString()) : ""
  );
  return retArray;
}

//July 7, 2020: there seems to be an issue here so come back to this
function normalizeDescriptions(description) {
  let desc =
    capitalizeName(description.substring(0, description.indexOf("_"))) +
    " " +
    capitalizeName(
      description.substring(description.indexOf("_") + 1, description.length)
    );
  //console.log(desc);
  return desc;
}
