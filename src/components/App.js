import React, { useEffect, useState } from "react";
import {
  compareLocations,
  updateMatrix,
  constructMatrixFromTemplate,
} from "functional-game-utils";
import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";

import Grid from "./Grid";

const GlobalStyles = createGlobalStyle`
  margin: 0;
`;

const TileStyles = styled.div`
  background-color: ${(props) =>
    props.selected ? "lightpink" : props.hovered ? "lightyellow" : "lightblue"};
  border: 1px solid blue;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
`;

const Tile = ({ children, hovered, selected, onClick }) => {
  return (
    <TileStyles selected={selected} hovered={hovered} onClick={onClick}>
      {children}
    </TileStyles>
  );
};

const TileObjectStyles = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
`;

const TileObject = ({ children, onClick }) => {
  return <TileObjectStyles onClick={onClick}>{children}</TileObjectStyles>;
};

const App = () => {
  const [tiles, setTiles] = useState();
  const [options, setOptions] = useState({
    tileWidth: 64,
    tileHeight: 64,
  });
  const [pieces, setPieces] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    row: -1,
    col: -1,
  });

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
          renderTile={({ tile, location, hovered }) => {
            return (
              <Tile
                onClick={() => {
                  setPieces([...pieces, { object: "x", location }]);
                }}
                selected={compareLocations(location, selectedLocation)}
                hovered={hovered}
              >
                {tile}
              </Tile>
            );
          }}
          renderObject={({ object, location }) => (
            <TileObject onClick={() => setSelectedLocation(location)}>
              {object}
            </TileObject>
          )}
          options={options}
        />
      )}
    </>
  );
};

export default App;
