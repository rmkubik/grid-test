import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import {
  getDimensions,
  mapMatrix,
  constructMatrixFromTemplate,
} from "functional-game-utils";

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
  const renderTiles = mapMatrix((tile, location, tiles) => (
    <Tile
      key={JSON.stringify(location)}
      tileWidth={tileWidth}
      tileHeight={tileHeight}
    >
      {renderTile(tile, location, tiles)}
    </Tile>
  ));

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
  const [tiles, setTiles] = useState();
  const [options, setOptions] = useState({
    tileWidth: 32,
    tileHeight: 32,
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
      {tiles && <Grid tiles={tiles} renderTile={(tile) => tile} {...options} />}
    </>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
