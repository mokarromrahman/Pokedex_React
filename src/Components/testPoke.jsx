import React, { useState, useEffect } from "react";
import { Container, Row, Image, Button, Col, Badge } from "react-bootstrap";
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
export default function TestPokemon({ number }) {
  const [data, setData] = useState(null);
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
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
        setCurrentType(tempTypes[1]);
      })
      .catch(console.error);
  }, [number]); //im not sure that the 2nd arguement is doing anything but it got rid of a warning

  //data was found for this pokemon
  //   if (data) {
  //     //find all the sprites and the names of each sprite normalized names
  //     const spritesArray = getSpriteArray(data.sprites);
  //     //console.log(spritesArray);  //used in testing
  //     return (
  //       <>
  //         <Container
  //           //https://stackoverflow.com/questions/36209432/reactjs-add-dynamic-class-to-manual-class-names
  //           //this can be used to dynamically change the classes
  //           className={`customBorder customBorder-` + currentType}
  //           style={{ width: "15em" }}
  //         >
  //           <Row className="justify-content-md-center">
  //             <label>{capitalizeName(data.name)}</label>
  //           </Row>
  //           <PicSlideShow spritesDescUrlArray={spritesArray} />
  //           <Row className="justify-content-md-center">
  //             {Object.values(types).map((t) => (
  //               <Badge pill className={`customBadge-` + t}>
  //                 {capitalizeName(t)}
  //               </Badge>
  //             ))}
  //           </Row>
  //         </Container>
  //       </>
  //     );
  //   }
  //return <div>{number} not found.</div>;

  return data ? (
    <>
      <Container
        //https://stackoverflow.com/questions/36209432/reactjs-add-dynamic-class-to-manual-class-names
        //this can be used to dynamically change the classes
        className={`customBorder customBorder-` + currentType}
        style={{ width: "15em" }}
      >
        <Row className="justify-content-md-center">
          <label>{capitalizeName(data.name)}</label>
        </Row>
        <PicSlideShow spritesDescUrlArray={getSpriteArray(data.sprites)} />
        <Row className="justify-content-md-center">
          {Object.values(types).map((t) => (
            <Badge pill className={`customBadge-` + t}>
              {capitalizeName(t)}
            </Badge>
          ))}
        </Row>
      </Container>
    </>
  ) : (
    <div>{number} not found.</div>
  );
}

function PicSlideShow({ spritesDescUrlArray }) {
  const [sprites, setSprites] = useState(spritesDescUrlArray);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
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
