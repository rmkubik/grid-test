import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";

const useGsapToggle = (options) => {
  const [open, set] = useState(false);

  // create ref using useState and then we use pass our setRef function to the ref of object
  // we want to animate
  const [ref, setRef] = useState({});

  // memoise the inital timeline in a ref so it doesnt get recreated each render.
  const { current: tl } = useRef(gsap.timeline({ paused: true }));

  // maybe useLayoutEffect maybe better here?
  useEffect(() => {
    tl.to(ref, options);
  }, [ref, options, tl]);

  const animate = useCallback(() => {
    open ? tl.reverse() : tl.play();

    set(!open);
  }, [open, tl]);

  return [setRef, animate];
};

export default useGsapToggle;

export const useTweenedState = (initialState, options) => {
  const [state, setState] = useState(initialState);
  const targetStateRef = useRef();

  const ref = useRef();

  const { current: tl } = useRef(
    gsap.timeline({
      paused: true,
      onComplete: () => {
        setState(targetStateRef.current);
      },
    })
  );

  useEffect(() => {
    tl.to(ref.current, options);
  }, [ref, options, tl]);

  const animate = useCallback(
    (targetState) => {
      targetStateRef.current = targetState;
      tl.play();
    },
    [open, tl]
  );

  return [ref, state, animate];
};

export const useAnimation = (ref, options) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const onCompleteRef = useRef();

  const { current: tl } = useRef(
    gsap.timeline({
      paused: true,
      onComplete: () => onCompleteRef.current(),
    })
  );

  useEffect(() => {
    tl.to(ref.current, options);
  }, [ref, options, tl]);

  const animate = useCallback(
    (onComplete) => {
      if (isAnimating) {
        return;
      }

      onCompleteRef.current = () => {
        onComplete();
        setIsAnimating(false);
      };

      setIsAnimating(true);
      tl.play();
    },
    [open, tl, isAnimating]
  );

  return animate;
};
