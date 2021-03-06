import React, { useState, useEffect } from "react";
import { Container, Row, Image, Button, Col, Badge } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import "../styling/style.css";
//types icons came from https://github.com/duiker101/pokemon-type-svg-icons
import Bug from "../type_icons/bug.svg";
import Dark from "../type_icons/dark.svg";
import Dragon from "../type_icons/dragon.svg";
import Electric from "../type_icons/electric.svg";
import Fairy from "../type_icons/fairy.svg";
import Fighting from "../type_icons/fighting.svg";
import Fire from "../type_icons/fire.svg";
import Flying from "../type_icons/flying.svg";
import Ghost from "../type_icons/ghost.svg";
import Grass from "../type_icons/grass.svg";
import Ground from "../type_icons/ground.svg";
import Ice from "../type_icons/ice.svg";
import Normal from "../type_icons/normal.svg";
import Poison from "../type_icons/poison.svg";
import Psychic from "../type_icons/psychic.svg";
import Rock from "../type_icons/rock.svg";
import Steel from "../type_icons/steel.svg";
import Water from "../type_icons/water.svg";

//Component which will be used to render a single pokemon
export default function TestPokemon({ name }) {
  const [data, setData] = useState(null);
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [foundSprites, setFoundSprites] = useState([]);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((r) => {
        //set the data
        setData(r);
        //set the types of the pokemon
        let tempTypes = [];
        Object.values(r.types).map((t) => {
          tempTypes.push(t.type.name);
        });
        setTypes(tempTypes);
        //set the current type to the first type
        setCurrentType(tempTypes[0]);

        const sortedPicsArray = sortSprites(getSpriteArray(r.sprites));
        console.log(sortedPicsArray);
        setFoundSprites(sortedPicsArray);
        //setFoundSprites(sortSprites(getSpriteArray(r.sprites)));
        //console.log(sortSprites(getSpriteArray(r.sprites)));
        setLoading(false);
      })
      .catch(console.error);
  }, [name]); //im not sure that the 2nd arguement is doing anything but it got rid of a warning

  if (loading) {
    return <Container fluid>Loading</Container>;
  }
  // useEffect
  return data ? (
    //data was found for this pokemon
    <>
      <Container
        //https://stackoverflow.com/questions/36209432/reactjs-add-dynamic-class-to-manual-class-names
        //this can be used to dynamically change the classes
        className={`pokemonContainer customBorder customBorder-` + currentType}
        style={{ width: "15em" }}
      >
        <Row className="justify-content-md-center">
          <label>{data.id + ". " + capitalizeName(data.name)}</label>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Button
              size="sm"
              onClick={() =>
                currentSpriteIndex === 0
                  ? setCurrentSpriteIndex(foundSprites.length - 1)
                  : setCurrentSpriteIndex(currentSpriteIndex - 1)
              }
            >
              <ArrowLeft></ArrowLeft>
            </Button>
          </Col>

          <Col md="auto">
            <Image
              src={foundSprites[currentSpriteIndex].url}
              alt={foundSprites[currentSpriteIndex].description}
              fluid
              thumbnail
            ></Image>
          </Col>

          <Col xs lg="2">
            <Button
              size="sm"
              onClick={() =>
                currentSpriteIndex === foundSprites.length - 1
                  ? setCurrentSpriteIndex(0)
                  : setCurrentSpriteIndex(currentSpriteIndex + 1)
              }
            >
              <ArrowRight></ArrowRight>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <label>
            {normalizeDescriptions(
              foundSprites[currentSpriteIndex].description
            )}
          </label>
        </Row>
        <Row className="justify-content-md-center">
          {Object.values(types).map((t) => (
            <Badge pill className={`customBadge-` + t} key={t}>
              {capitalizeName(t) + " "}
              <img src={pokeTypePic(t.toString())} width="20em" alt={t} />
            </Badge>
          ))}
        </Row>
      </Container>
    </>
  ) : (
    //there was no data returned for the pokemon
    <div>{name} not found.</div>
  );
}

// //Type Badge component using the specific type
// function TypeBadges({ pokemonType }) {
//   const [thisType, setThisType] = useState(pokemonType);
//   return (
//     <Badge pill className={`customBadge-` + thisType} key={thisType}>
//       {capitalizeName(thisType) + " "}
//       <img src={pokeTypePic(thisType.toString())} width="20em" alt={thisType} />
//     </Badge>
//   );
// }

//Return the specific type logo SVG from the provided type
function pokeTypePic(foundType) {
  //console.log(foundType);
  switch (foundType) {
    case "bug":
      return Bug;
    case "dark":
      return Dark;
    case "dragon":
      return Dragon;
    case "electric":
      return Electric;
    case "fairy":
      return Fairy;
    case "fighting":
      return Fighting;
    case "fire":
      return Fire;
    case "flying":
      return Flying;
    case "ghost":
      return Ghost;
    case "grass":
      return Grass;
    case "ground":
      return Ground;
    case "ice":
      return Ice;
    case "normal":
      return Normal;
    case "poison":
      return Poison;
    case "psychic":
      return Psychic;
    case "rock":
      return Rock;
    case "steel":
      return Steel;
    case "water":
      return Water;
    default:
      return "This type does not exist.";
  }
}

//Slide show of the sprites of the pokemon which
//are controllable with arrows.
function PicSlideShow({ spritesDescUrlArray }) {
  const [sprites, setSprites] = useState(spritesDescUrlArray);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
  //sort the array
  useEffect(() => {
    setSprites(sortSprites(spritesDescUrlArray));
  }, []);
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
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

        <Col md="auto">
          <Image
            src={sprites[currentSpriteIndex].url}
            alt={sprites[currentSpriteIndex].description}
            fluid
            thumbnail
          ></Image>
        </Col>

        <Col xs lg="2">
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
      </Row>
      <Row className="justify-content-md-center">
        <label>
          {normalizeDescriptions(sprites[currentSpriteIndex].description)}
        </label>
      </Row>
    </>
  );
}

//sort the sprites array by the specific description order
function sortSprites(spritesDescUrlArray) {
  //order of the image descriptions
  const imageOrderOriginal = [
    "front_default",
    "back_default",
    "front_female",
    "back_female",
    "front_shiny",
    "back_shiny",
    "front_shiny_female",
    "back_shiny_female",
  ];
  //console.log(spritesDescUrlArray);
  let sortedArray = [];
  imageOrderOriginal.forEach((i) => {
    Object.values(spritesDescUrlArray).map((s) => {
      //console.log(s);
      if (s.description === i) {
        sortedArray.push(s);
      }
    });
  });
  //console.log(sortedArray);
  return sortedArray;
}
//Capitalize the first letter of the word provided
function capitalizeName(name) {
  return name[0].toUpperCase() + name.slice(1);
}

//create an array of descriptions and urls of sprite images
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
  Object.values(spritesArray).map((u, i) =>
    u ? normalizeDescriptions(Object.keys(spritesArray)[i].toString()) : ""
  );
  return retArray;
}

//July 7, 2020: there seems to be an issue here so come back to this
function normalizeDescriptions(description) {
  // let desc =
  //   capitalizeName(description.substring(0, description.indexOf("_"))) +
  //   " " +
  //   capitalizeName(
  //     description.substring(description.indexOf("_") + 1, description.length)
  //   );
  //console.log(desc);
  let desc = description;
  while (desc.includes("_")) {
    desc = desc.replace("_", " ");
  }
  return capitalizeName(desc);
}
