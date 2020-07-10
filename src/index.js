import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Pokemon from "./Components/Pokemon";
import TestPokemon from "./Components/testPoke";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  //<React.StrictMode>
  <Pokemon number={"pikachu"} />,
  //</React.StrictMode>,
  document.getElementById("root")
);
