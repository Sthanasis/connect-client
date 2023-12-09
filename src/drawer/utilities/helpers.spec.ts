import {
  getNextHigherValue,
  getNextLowerValue,
} from '@drawer/utilities/helpers';
import { describe, expect, it } from 'vitest';

describe('drawer helper utilities', () => {
  const list = [1, 2, 3, 4];
  it('returns the next higher value, if any, from a list', () => {
    let value = getNextHigherValue(list, 1);
    expect(value).toBe(2);
    value = getNextHigherValue(list, list[list.length - 1]);
    expect(value).toBeUndefined();
  });

  it('returns the next lower value, if any, from a list', () => {
    let value = getNextLowerValue(list, list[1]);
    expect(value).toBe(1);
    value = getNextLowerValue(list, list[0]);
    expect(value).toBeUndefined();
  });
});
