import React, { useEffect, useState, useRef } from "react";
import {
  compareLocations,
  updateMatrix,
  constructMatrixFromTemplate,
} from "functional-game-utils";
import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";
import gsap, { TweenMax } from "gsap";
import useGsapToggle, {
  useAnimation,
  useTweenedState,
} from "../hooks/useGsapToggle";

import Grid from "./Grid";

const GlobalStyles = createGlobalStyle`
  margin: 0;
`;

const TileStyles = styled.div`
  background-color: ${(props) =>
    props.selected ? "#FFB6C1" : props.hovered ? "lightyellow" : "lightblue"};
  border: 1px solid blue;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
`;

const Tile = ({ children, hovered, selected, onClick }) => {
  // const [ref, currentlySelected, animate] = useTweenedState(false, {
  //   backgroundColor: "#FFB6C1",
  //   ease: "power4.inOut",
  // });
  const ref = useRef();
  const [currentlySelected, setCurrentlySelected] = useState(false);
  const animateSelect = useAnimation(ref, {
    backgroundColor: "#FFB6C1",
    ease: "power4.inOut",
  });
  const animateDeSelect = useAnimation(ref, {
    backgroundColor: "#ADD8E6",
    ease: "power4.inOut",
  });

  console.log(selected, currentlySelected);

  useEffect(() => {
    if (selected === currentlySelected) {
      return;
    }

    if (selected) {
      animateSelect(() => setCurrentlySelected(selected));
    } else {
      animateDeSelect(() => setCurrentlySelected(selected));
    }
  }, [selected, setCurrentlySelected]);

  return (
    <TileStyles
      ref={ref}
      selected={currentlySelected}
      hovered={hovered}
      onClick={onClick}
    >
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
  const [ref, tweenedText, animate] = useTweenedState("starter text", {
    // scaleX: 2,
    x: 200,
    ease: "power4.inOut", // "elastic.inOut(1, 1)",
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
      <h1
        style={{ display: "inline-block" }}
        ref={ref}
        onClick={() => animate("new text")}
      >
        {tweenedText}
      </h1>
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
          renderObject={({ object, location }) => {
            return (
              <TileObject onClick={() => setSelectedLocation(location)}>
                {object}
              </TileObject>
            );
          }}
          options={options}
        />
      )}
    </>
  );
};

export default App;
