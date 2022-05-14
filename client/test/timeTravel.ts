// this code is from https://benjaminjohnson.me/blog/testing-animations-in-react-native

import MockDate from 'mockdate';

const FRAME_TIME = 10;

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

const advanceOneFrame = (): void => {
  const now = Date.now();
  MockDate.set(new Date(now + FRAME_TIME));
  jest.advanceTimersByTime(FRAME_TIME);
};

const timeTravel = (msToAdvance: number = FRAME_TIME): void => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME;
  let framesElapsed = 0;

  // Step through each of the frames until we've ran them all
  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame();
    framesElapsed++;
  }
};

export const setupTimeTravel = (): void => {
  MockDate.set(0);
  jest.useFakeTimers();
};

export default timeTravel;
