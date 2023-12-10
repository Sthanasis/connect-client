<script setup lang="ts">
import { computed, CSSProperties, ref, watch } from 'vue';

import { useDrawerGestures, useMutationObserver } from '@drawer/composables';
import {
  defaultStepsHeight,
  HEIGHT_MEASUREMENT,
  TRANSLATE_MEASUREMENT,
} from '@drawer/constants';
import { DrawerEvents } from '@drawer/constants';
import { drawerPubSub, vhToPixels } from '@drawer/utilities';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    onClose: () => void;
    stepsHeight?: number[];
  }>(),
  {
    stepsHeight: () => defaultStepsHeight,
  }
);

const drawer = ref<HTMLElement>(),
  header = ref<HTMLElement>(),
  intersection = ref<HTMLElement>();
const isDrawerActive = ref(false),
  translate = ref(0),
  activeStepHeight = ref(0);

const sortedStepsHeight = computed(() =>
  props.stepsHeight.map((step) => (step === 100 ? 99.99 : step)).sort()
);
const contentHeight = ref(0);
const biggestSortedStepHeight = computed(
  () => sortedStepsHeight.value[sortedStepsHeight.value.length - 1]
);

const { observe, disconnect } = useMutationObserver(handleDrawerContentChange);

const { onDrag, onTouchStart, onTouchEnd } = useDrawerGestures(
  sortedStepsHeight,
  contentHeight,
  translate,
  activeStepHeight
);

const heightClass = computed<CSSProperties>(() => {
  const height = vhToPixels(activeStepHeight.value);
  const extraOffset = header.value?.offsetHeight ?? 0;
  return {
    maxHeight: `${height - extraOffset}${HEIGHT_MEASUREMENT}`,
  };
});
const translateStyle = computed(
  () => `${translate.value}${TRANSLATE_MEASUREMENT}`
);

function handleClose() {
  drawer.value?.classList.remove('slide-in');
  drawer.value?.classList.add('slide-out');
  isDrawerActive.value = false;
}

function handleDrawerContentChange() {
  activeStepHeight.value = biggestSortedStepHeight.value;
  Promise.resolve().then(() => {
    if (!intersection.value || !drawer.value || !header.value) return;
    if (!drawer.value) return;
    contentHeight.value = intersection.value.offsetTop;
    setTranslate(drawer.value.clientHeight - intersection.value.offsetTop);
  });
}

function onAnimationEnd() {
  if (!isDrawerActive.value) props.onClose();
}

function toggleDrawerTransition(isDragging: boolean) {
  isDragging
    ? drawer.value?.classList.remove('drawer-transition')
    : drawer.value?.classList.add('drawer-transition');
}

function setTranslate(value: number) {
  translate.value = value;
}

watch(
  () => drawer.value,
  () => {
    if (!drawer.value) {
      disconnect();
      drawerPubSub.clear();
      return;
    }
    drawerPubSub.on(DrawerEvents.CLOSE, handleClose);
    drawerPubSub.on(DrawerEvents.IS_DRAGGING, toggleDrawerTransition);
    drawerPubSub.on(DrawerEvents.TRANSLATE, setTranslate);
    drawerPubSub.on(
      DrawerEvents.CHANGE_HEIGHT_STEP,
      (val) => (activeStepHeight.value = val)
    );
    observe(drawer.value);
    drawer.value.classList.add('slide-in');
    isDrawerActive.value = true;
    handleDrawerContentChange();
  }
);
</script>

<template>
  <div v-if="isOpen">
    <div
      class="tw-fixed tw-h-full tw-duration-300 tw-transition-opacity tw-ease-in tw-w-full tw-left-0 tw-top-0 tw-bg-n-8-dark-steel/50"
      :class="{
        'tw-opacity-100': isDrawerActive,
        'tw-opacity-0': !isDrawerActive,
      }"
      @click="handleClose"
    />
    <div
      ref="drawer"
      class="tw-fixed tw-flex tw-flex-col tw-overflow-hidden tw-bg-inherit tw-left-0 tw-w-full tw-h-full tw-bottom-0 tw-rounded-t-xl drawer-transition"
      @animationend="onAnimationEnd"
    >
      <div
        ref="header"
        class="tw-flex tw-justify-center tw-w-full tw-py-n"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onDrag"
        @touchend="onTouchEnd"
      >
        <div class="tw-h-s tw-w-[36px] tw-rounded-full tw-bg-white" />
      </div>
      <div :style="heightClass">
        <slot />
      </div>
      <div ref="intersection" />
    </div>
  </div>
</template>

<style scoped>
.slide-in {
  transform: translateY(v-bind(translateStyle));
  animation: slide-in 0.3s ease-out;
}

.slide-out {
  animation: slide-out 0.3s ease-out;
}

.drawer-transition {
  transition-duration: 0.3s;
  transition-property: transform;
}

@keyframes slide-in {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(v-bind(translateStyle));
  }
}

@keyframes slide-out {
  from {
    transform: translateY(v-bind(translateStyle));
  }
  to {
    transform: translateY(100%);
  }
}
</style>
