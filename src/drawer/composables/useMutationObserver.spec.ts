import { flushPromises } from '@vue/test-utils';
import { ref } from 'vue';

import { useMutationObserver } from '@drawer/composables/useMutationObserver';
import { describe, expect, it, vi } from 'vitest';

describe('Mutation Observer', () => {
  it('when connected triggers the callback after a childNode change, else not', async () => {
    const fn = vi.fn();
    const mockElement = document.createElement('div');
    const target = ref<HTMLElement>(mockElement);
    const child = document.createElement('div');
    const { observe, disconnect } = useMutationObserver(fn);
    observe(target.value);
    target.value.appendChild(child);
    await flushPromises();
    expect(fn).toHaveBeenCalledTimes(1);
    disconnect();
    target.value.appendChild(child);
    await flushPromises();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
