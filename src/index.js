import ReactDOM from "react-dom";
import React, { useState } from "react";
import {
  getDimensions,
  mapMatrix,
  constructMatrixFromTemplate,
} from "functional-game-utils";

const defaultTiles = constructMatrixFromTemplate(
  (char) => char,
  `. . . .
   . . . .
   . . . .
   . . . .
    `
);

const Tile = ({ children, tileWidth, tileHeight }) => {
  return (
    <div
      style={{
        width: `${tileWidth}px`,
        height: `${tileHeight}px`,
      }}
    >
      {children}
    </div>
  );
};

const Grid = ({ tiles, renderTile, tileWidth, tileHeight }) => {
  const dimensions = getDimensions(tiles);
  const renderTiles = mapMatrix(renderTile);

  console.log(`${tileWidth}px`.repeat(dimensions.width));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${tileWidth}px `.repeat(dimensions.width),
      }}
    >
      {renderTiles(tiles)}
    </div>
  );
};

const App = () => {
  const [tiles, setTiles] = useState(defaultTiles);
  const [options, setOptions] = useState({
    tileWidth: 32,
    tileHeight: 32,
  });

  return (
    <>
      <h1>Hello world!</h1>
      <Grid
        tiles={tiles}
        renderTile={(tile, location) => (
          <Tile key={JSON.stringify(location)} {...options}>
            {tile}
          </Tile>
        )}
        {...options}
      />
    </>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
