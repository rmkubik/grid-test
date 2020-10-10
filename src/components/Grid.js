import React from "react";
import { getDimensions, mapMatrix } from "functional-game-utils";

const Tile = ({ children, tileWidth, tileHeight }) => {
  return (
    <div
      style={{
        width: tileWidth,
        height: tileHeight,
      }}
    >
      {children}
    </div>
  );
};

const Grid = ({
  tiles,
  renderTile,
  options: { tileWidth, tileHeight } = {},
}) => {
  let effectiveTileWidth = tileWidth;
  let effectiveTileHeight = tileHeight;

  if (typeof tileWidth === "number") {
    effectiveTileWidth = `${tileWidth}px`;
  }

  if (typeof tileHeight === "number") {
    effectiveTileHeight = `${tileHeight}px`;
  }

  const dimensions = getDimensions(tiles);
  const renderTiles = mapMatrix((tile, location, tiles) => (
    <Tile
      key={JSON.stringify(location)}
      tileWidth={effectiveTileWidth}
      tileHeight={effectiveTileHeight}
    >
      {renderTile(tile, location, tiles)}
    </Tile>
  ));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${effectiveTileWidth} `.repeat(dimensions.width),
      }}
    >
      {renderTiles(tiles)}
    </div>
  );
};

export default Grid;
