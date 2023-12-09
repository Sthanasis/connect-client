<script setup lang="ts">
import { ref } from 'vue';
import { DrawerContainer } from '@/drawer';
const open = ref(false);
const isShort = ref(true);
const content = ref(
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vitae fugiat sed deserunt! Perspiciatis iure ut aperiam at consectetur provident odit deserunt suscipit, dolore dolor nesciunt debitis minima magni et?' +
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vitae fugiat sed deserunt! Perspiciatis iure ut aperiam at consectetur provident odit deserunt suscipit, dolore dolor nesciunt debitis minima magni et?' +
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vitae fugiat sed deserunt! Perspiciatis iure ut aperiam at consectetur provident odit deserunt suscipit, dolore dolor nesciunt debitis minima magni et?'
);
</script>
<template>
  <button @click="open = !open">toggle</button>

  <DrawerContainer
    class="tw-bg-stone-500"
    :is-open="open"
    :onClose="() => (open = false)"
  >
    <div class="tw-h-full tw-overflow-y-auto">
      <div v-if="isShort" class="tw-h-[1000px]">
        this is the drwaer
        <div>
          <button @click="isShort = !isShort">toggle Content</button>
        </div>
      </div>
      <div v-else class="tw-h-[1000px]">
        {{ content }}
        <div>
          <button @click="isShort = !isShort">toggle Content</button>
        </div>
      </div>
    </div>
  </DrawerContainer>
</template>
