import { describe, it, beforeEach, expect } from 'vitest';
import { heightToTopOffset, vhToPixels } from '@drawer/utilities/calculations';

describe('calculation utilities', () => {
  beforeEach(() => {
    global.innerHeight = 500;
  });
  it('converts viewport height to pixels', () => {
    expect(vhToPixels(20)).toBe(100);
  });
  it('return the offset of the given height', () => {
    expect(heightToTopOffset(100)).toBe(400);
  });
});
