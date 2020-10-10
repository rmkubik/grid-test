import React, { useEffect, useState } from "react";
import { constructMatrixFromTemplate } from "functional-game-utils";
import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";

import useHover from "../hooks/useHover";
import Grid from "./Grid";

const GlobalStyles = createGlobalStyle`
  margin: 0;
`;

const TileStyles = styled.div`
  background-color: ${(props) => (props.hovered ? "lightyellow" : "lightblue")};
  border: 1px solid blue;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
`;

const Tile = ({ children, hovered }) => {
  return <TileStyles hovered={hovered}>{children}</TileStyles>;
};

const App = () => {
  const [tiles, setTiles] = useState();
  const [options, setOptions] = useState({
    tileWidth: 64,
    tileHeight: 64,
  });
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const defaultPieces = [];
    const defaultTiles = constructMatrixFromTemplate(
      (char, location) => {
        if (char === "x") {
          defaultPieces.push({ object: char, location });
        }

        return "";
      },
      `. . . . . .
       . . . . . .
       . . . . . .
       . . x . . .
       . . . . . .
       . . . . . .
      `
    );

    setPieces(defaultPieces);
    setTiles(defaultTiles);
  }, []);

  return (
    <>
      {tiles && (
        <Grid
          tiles={tiles}
          objects={pieces}
          renderTile={({ tile, hovered }) => (
            <Tile hovered={hovered}>{tile}</Tile>
          )}
          renderObject={({ object }) => (
            <div onClick={() => alert(object)}>{object}</div>
          )}
          options={options}
        />
      )}
    </>
  );
};

export default App;
