import React, { useEffect, useState } from "react";
import { constructMatrixFromTemplate } from "functional-game-utils";

import Grid from "./Grid";

const App = () => {
  const [tiles, setTiles] = useState();
  const [options, setOptions] = useState({
    tileWidth: "25vw",
    tileHeight: "25vh",
  });

  useEffect(() => {
    const defaultTiles = constructMatrixFromTemplate(
      (char) => char,
      `. . . .
         . . . .
         . . . .
         . . x .
        `
    );

    setTiles(defaultTiles);
  }, []);

  return (
    <>
      <h1>Hello world!</h1>
      {tiles && (
        <Grid tiles={tiles} renderTile={(tile) => tile} options={options} />
      )}
    </>
  );
};

export default App;
