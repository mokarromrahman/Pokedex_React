import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Container } from "react-bootstrap";

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
    return (
      // <div>
      //   <h1>{CapitalizeName(data.name)}</h1>

      //   {Object.values(data.sprites).map((url, i) => (
      //     <>{url ? <PokePic picURL={url} /> : ""}</> //display non null images
      //   ))}
      // </div>
      <Container>
        <h1>{CapitalizeName(data.name)}</h1>
        <Carousel>
          {Object.values(data.sprites).map((url, i) => (
            <>
              {url ? (
                <Carousel.Item>
                  <PokePic picURL={url} />
                </Carousel.Item>
              ) : (
                ""
              )}
            </> //display non null images
          ))}
        </Carousel>
      </Container>
    );
  }
  return <div>{number} not found.</div>;
}

function PokePic({ picURL }) {
  return <img src={picURL} />;
}
function CapitalizeName(name) {
  return name[0].toUpperCase() + name.slice(1);
}
