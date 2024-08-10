import { useEffect, useState, useCallback } from "react";

export interface Orientation {
  alpha: number;
  beta: number;
  gamma: number;
}

export const useOrientation = () => {
  const [initialOrientation, setInitialOrientation] =
    useState<Orientation | null>(null);
  const [orientationDiff, setOrientationDiff] = useState<Orientation>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (!initialOrientation) {
        setInitialOrientation({
          alpha: event.alpha || 0,
          beta: event.beta || 0,
          gamma: event.gamma || 0,
        });
      } else {
        setOrientationDiff({
          alpha: (event.alpha || 0) - initialOrientation.alpha,
          beta: (event.beta || 0) - initialOrientation.beta,
          gamma: (event.gamma || 0) - initialOrientation.gamma,
        });
      }
    },
    [initialOrientation]
  );

  const reset = useCallback(() => {
    setInitialOrientation(null);
  }, []);

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [handleOrientation]);

  return { orientationDiff, reset };
};
