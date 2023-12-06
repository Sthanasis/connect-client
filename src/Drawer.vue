<script setup lang="ts">
import { computed, CSSProperties, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    onClose: () => void;
    heights?: number[];
  }>(),
  {
    heights: () => [66, 20, 95],
  }
);

const drawer = ref<HTMLElement>(),
  content = ref<HTMLElement>(),
  intersection = ref<HTMLElement>();

const mutationObserver = ref<MutationObserver>();

const translate = ref<number>(0),
  start = ref<number>(0),
  delta = ref<number>(0),
  move = ref<number>(0),
  contentHeight = ref<number>(0),
  maxContentHeight = ref<number>(0);

const isDrawerActive = ref(false);
const steps = computed(() => [...props.heights].sort());
const maxHeight = ref(steps.value[steps.value.length - 1]);

const heightClass = computed<CSSProperties>(() => ({
  maxHeight: `${maxHeight.value}vh`,
}));

const minimumOffset = computed(
  () => window.innerHeight - maxContentHeight.value
);

const translateStyle = computed(() => `${translate.value}px`);

function onTouchStart(e: TouchEvent) {
  if (e.cancelable) e.preventDefault();
  drawer.value?.classList.remove('transition');
  start.value = e.touches[0].clientY;
}

function onDrag(e: TouchEvent) {
  if (e.cancelable) e.preventDefault();
  const { clientY } = e.touches[0];
  if (clientY <= minimumOffset.value) return; // has riched maximum height

  delta.value = clientY - start.value;
  move.value = clientY;
  if (move.value <= 0) return;
  translate.value = move.value;
}

function onTouchEnd() {
  drawer.value?.classList.add('transition');

  if (move.value)
    delta.value >= 0
      ? onSwipeDown(maxHeight.value)
      : onSwipeUp(maxHeight.value);
  start.value = 0;
  move.value = 0;
  delta.value = 0;
}

function onSwipeUp(currentHeight: number): void {
  console.log(currentHeight);
  const height = getNextHighestValue(steps.value, currentHeight);
  if (!height) {
    maxHeight.value = steps.value[steps.value.length - 1];
    translate.value = minimumOffset.value;
    return;
  }
  if (calculateHeight(height) > maxContentHeight.value) {
    translate.value = window.innerHeight - maxContentHeight.value;
    maxHeight.value = height;
    return;
  }
  if (move.value < getHeightOffset(height)) return onSwipeUp(height);
  maxHeight.value = height;
  translate.value = getHeightOffset(height);
}

function onSwipeDown(currentHeight: number): void {
  const height = getNextLowestValue(steps.value, currentHeight);
  if (!height) {
    handleClose();
    return;
  }
  if (move.value > getHeightOffset(height)) return onSwipeDown(height);
  maxHeight.value = height;
  translate.value = getHeightOffset(height);
}

function calculateHeight(height: number) {
  return Math.round(window.innerHeight * (height / 100) + 20); //TODO: REPLACE WITH HEADER HEIGHT
}

function getHeightOffset(height: number) {
  return Math.round(window.innerHeight - calculateHeight(height));
}

function getNextHighestValue(list: number[], value: number) {
  return list.find((height) => height > value);
}

function getNextLowestValue(list: number[], value: number) {
  return [...list].reverse().find((height) => height < value);
}

async function handleClose() {
  drawer.value?.classList.remove('slide-in');
  drawer.value?.classList.add('slide-out');
  isDrawerActive.value = false;
}

function translateToBottom() {
  if (!intersection.value) return;
  if (!drawer.value) return;
  if (intersection.value.offsetTop > maxContentHeight.value)
    maxContentHeight.value = intersection.value.offsetTop;
  contentHeight.value = intersection.value.offsetTop;
  translate.value = drawer.value.clientHeight - contentHeight.value;
}

function onAnimationEnd() {
  if (!isDrawerActive.value) props.onClose();
}

watch(
  () => drawer.value,
  () => {
    if (!drawer.value) {
      mutationObserver.value?.disconnect();
      maxHeight.value = steps.value[steps.value.length - 1];
      return;
    }
    drawer.value.classList.add('slide-in');
    isDrawerActive.value = true;
    translateToBottom();
    mutationObserver.value = new MutationObserver(translateToBottom);
    mutationObserver.value.observe(drawer.value, {
      childList: true,
      subtree: true,
    });
  }
);
</script>

<template>
  <Transition
    enter-from-class="tw-opacity-0"
    enter-active-class="tw-transition-all tw-ease-base tw-duration-slow"
    enter-to-class="tw-opacity-full"
    leave-from-class="tw-opacity-full"
    leave-active-class="tw-transition-all tw-ease-base tw-duration-50"
    leave-to-class="tw-opacity-0"
  >
    <div
      v-if="isOpen"
      class="tw-fixed tw-h-full tw-w-full tw-left-0 tw-top-0 tw-bg-black/40"
      @click="handleClose"
    />
  </Transition>
  <div
    v-if="isOpen"
    ref="drawer"
    class="tw-fixed tw-flex tw-flex-col tw-overflow-hidden tw-left-0 tw-w-full tw-h-full tw-bottom-0 tw-bg-gray-600 tw-rounded-t-xl tw-z-10 transition"
    @animationend="onAnimationEnd"
  >
    <div
      class="tw-flex tw-justify-center tw-w-full tw-py-n"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onDrag"
      @touchend="onTouchEnd"
    >
      <div class="tw-h-s tw-w-[36px] tw-rounded-full tw-bg-white" />
    </div>
    <div ref="content" :style="heightClass">
      <slot />
    </div>
    <div ref="intersection" />
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

.transition {
  transition-duration: 0.3s;
  transition-property: all;
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
