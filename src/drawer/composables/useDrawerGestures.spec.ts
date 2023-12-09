import { beforeAll, describe, expect, MockInstance, vi } from 'vitest';
import { computed, ComputedRef, Ref, ref } from 'vue';

import { useDrawerGestures } from '@drawer/composables/useDrawerGestures';
import { defaultStepsHeight, DrawerEvents } from '@drawer/constants';
import drawerPubSub from '@drawer/utilities/drawerPubSub';
import { it } from 'node:test';

const mockTouch = (y: number) => ({
  identifier: Date.now(),
  target: document.createElement('div'),
  clientX: 0,
  clientY: y,
  radiusX: 2.5,
  radiusY: 2.5,
  rotationAngle: 10,
  force: 0.5,
  pageX: 0,
  pageY: 0,
  screenX: 0,
  screenY: 0,
});

describe('useDrawerGestures', () => {
  let steps: ComputedRef<number[]>;
  let contentHeight: Ref<number>;
  let translate: Ref<number>;
  let activeStepHeight: Ref<number>;

  let drawerPubSubSpy: MockInstance;
  beforeAll(() => {
    global.innerHeight = 500;
    steps = computed(() => defaultStepsHeight);
    contentHeight = ref(400);
    translate = ref(50);
    activeStepHeight = ref(steps.value[steps.value.length - 1]);
    drawerPubSubSpy = vi.spyOn(drawerPubSub, 'emit');
  });

  it('updates translate and activeHeightSteps on drag', () => {
    const { onTouchEnd, onTouchStart, onDrag } = useDrawerGestures(
      steps,
      contentHeight,
      translate,
      activeStepHeight
    );
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [mockTouch(translate.value)],
    });
    onTouchStart(touchStartEvent);
    onDrag(
      new TouchEvent('touchmove', {
        touches: [mockTouch(200)],
      })
    );
    onTouchEnd();
    expect(drawerPubSubSpy).toHaveBeenCalledWith(DrawerEvents.TRANSLATE, 200);
    expect(drawerPubSubSpy).toHaveBeenCalledWith(
      DrawerEvents.CHANGE_HEIGHT_STEP,
      steps.value[steps.value.length - 2]
    );
  });
});
