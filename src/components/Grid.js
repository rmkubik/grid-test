import React from "react";
import {
  getDimensions,
  mapMatrix,
  compareLocations,
} from "functional-game-utils";
import useHover from "../hooks/useHover";

function getObjectAtLocation(objects, targetLocation) {
  const foundTarget = objects.find(({ location }) =>
    compareLocations(location, targetLocation)
  );

  if (!foundTarget) {
    return undefined;
  }

  return foundTarget.object;
}

const TileLayer = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      {children}
    </div>
  );
};

const Tile = ({ children, tileWidth, tileHeight }) => {
  const [hovered, hoverHandlers] = useHover();

  return (
    <div
      style={{
        width: tileWidth,
        height: tileHeight,
        position: "relative",
      }}
      {...hoverHandlers}
    >
      {children(hovered)}
    </div>
  );
};

const Grid = ({
  tiles,
  objects,
  renderTile,
  renderObject,
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
  const renderTiles = mapMatrix((tile, location, tiles) => {
    const object = getObjectAtLocation(objects, location);

    return (
      <Tile
        key={JSON.stringify(location)}
        tileWidth={effectiveTileWidth}
        tileHeight={effectiveTileHeight}
      >
        {(hovered) => (
          <>
            {
              <TileLayer>
                {renderTile({ tile, location, tiles, hovered })}
              </TileLayer>
            }
            {object && (
              <TileLayer>
                {renderObject({ object, location, objects, hovered })}
              </TileLayer>
            )}
          </>
        )}
      </Tile>
    );
  });

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
