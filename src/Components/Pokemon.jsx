import React, { useState, useEffect } from "react";

//Component which will be used to render a single pokemon
export default function Pokemon({ number }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error());
  }, [data]); //im not sure that the 2nd arguement is doing anything but it got rid of a warning

  function PokePic({ myUrl }) {
    return <img src={myUrl} />;
  }

  //data was found for this pokemon
  if (data) {
    return (
      <div>
        <h1>{data.name}</h1>

        {data.sprites.map((url) => {
          //   if (url) {
          //     <label>{url}</label>;
          //   }
          <PokePic myUrl={url} />;
        })}
      </div>
    );
  }
  return <div>{number} not found.</div>;
}
//return <div>{JSON.stringify(data)}</div>;
// {
//   /* <label>{JSON.stringify(data.sprites)}</label> */
// }
