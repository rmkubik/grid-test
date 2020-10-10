import { useState } from "react";

const useHover = () => {
  const [hovered, setHovered] = useState(false);

  return [
    hovered,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  ];
};

export default useHover;
