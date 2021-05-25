import React from 'react';

const useTimeout = (callback: () => void, delay: number): void => {
  const savedCallback = React.useRef<() => void>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick(): void {
      savedCallback.current?.();
    }

    if (delay !== null) {
      let id = setTimeout(tick, delay);

      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
