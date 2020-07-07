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

  function PokePic({ picURL }) {
    if (picURL === null) {
      return <input type="text" value="I'm null" />;
    }

    return <img src={picURL} />;
  }
  //data was found for this pokemon
  if (data) {
    return (
      <div>
        <h1>{data.name}</h1>
        <ul>
          {Object.values(data.sprites).map((url, i) => (
            //<img src={url} />
            //<PokePic picKey={key} picUrl={url} />
            <li>
              {i}: {url}
              <PokePic picURL={url} />
            </li>
          ))}
        </ul>
        {JSON.stringify(data.sprites)}
      </div>
    );
  }
  return <div>{number} not found.</div>;
}
