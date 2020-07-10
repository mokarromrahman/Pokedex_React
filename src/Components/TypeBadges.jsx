import React, { useState, useEffect } from "react";
import { Container, Row, Image, Button, Col, Badge } from "react-bootstrap";
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

//Type Badge component using the specific type
export default function TypeBadges({ pokemonType }) {
  const [thisType, setThisType] = useState(pokemonType);
  return (
    <Badge pill className={`customBadge-` + thisType} key={thisType}>
      {capitalizeName(thisType) + " "}
      <img src={pokeTypePic(thisType.toString())} width="20em" alt={thisType} />
    </Badge>
  );
}

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

//Capitalize the first letter of the word provided
function capitalizeName(name) {
  return name[0].toUpperCase() + name.slice(1);
}
