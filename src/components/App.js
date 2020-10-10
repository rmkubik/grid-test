import React, { useEffect, useState } from "react";
import { constructMatrixFromTemplate } from "functional-game-utils";
import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";

import Grid from "./Grid";

const GlobalStyles = createGlobalStyle`
    margin: 0;
`;

const Tile = styled.div`
  background-color: lightblue;
  border: 1px solid blue;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 64px;

  &:hover {
    background-color: lightyellow;
    cursor: pointer;
  }
`;

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
      {tiles && (
        <Grid
          tiles={tiles}
          renderTile={(tile) => <Tile>{tile}</Tile>}
          options={options}
        />
      )}
    </>
  );
};

export default App;
