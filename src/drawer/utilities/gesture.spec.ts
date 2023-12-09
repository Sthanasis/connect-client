import { getSwipeDownPosition, getSwipeUpPosition } from '@drawer/utilities';
import { beforeEach, describe, expect, it } from 'vitest';

const steps = [33, 66, 95];

describe('drawer utilities', () => {
  beforeEach(() => {
    global.innerHeight = 500;
  });

  it('returns the next translate position after swipe down', () => {
    let payload = {
      currentStep: steps[steps.length - 1],
      heightSteps: steps,
      translate: 50,
    };
    expect(getSwipeDownPosition(payload)).toStrictEqual({
      position: 170,
      heightStep: 66,
    });
    payload = {
      ...payload,
      currentStep: steps[steps.length - 2],
      translate: 250,
    };
    expect(getSwipeDownPosition(payload)).toStrictEqual({
      position: 335,
      heightStep: 33,
    });
  });

  it('returns the next translate position after swipe up', () => {
    let payload = {
      currentStep: steps[steps.length - 1],
      heightSteps: steps,
      translate: 50,
      contentHeight: 450,
    };
    expect(getSwipeUpPosition(payload)).toStrictEqual({
      position: 50,
      heightStep: 95,
    });
    payload = {
      currentStep: steps[steps.length - 2],
      heightSteps: steps,
      translate: 50,
      contentHeight: 450,
    };
    expect(getSwipeUpPosition(payload)).toStrictEqual({
      position: 50,
      heightStep: 95,
    });
  });
});
