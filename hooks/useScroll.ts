import { useLayoutEffect, useState } from "react";

export const useScrollPositions = () => {
  const [scrollPosition, setPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    function updatePosition() {
      if(typeof window !== "undefined"){
        setPosition({ x: window.scrollX, y: window.scrollY });
      }
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};