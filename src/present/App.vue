<template>
  <div class="h-screen w-full flex overflow-hidden">
    <NavBar
      class="w-4/12 bg-gray-800 text-gray-300 h-full flex-col border-r border-gray-700 shadow-md select-none"
      :root-dir="appState?.currentDirectory"
      @image-selected="
        (file) => {
          console.log('log', file);
          showImage(file);
        }
      "
    />
    <div class="w-8/12 h-full bg-gray-600 flex flex-grow overflow-auto">
      <!-- <h1 class="text-3xl font-bold underline">Hello world!</h1> -->
      <!-- <div></div> -->
      <!-- <span class="w-full wrap">Showing: {{ image }}</span> -->
      <!-- <br /> -->
      <img class="w-full object-contain" :src="image" />

      <!-- <li v-for="(file, index) in files" @click="showImage(file)">
        {{ index }}. {{ file.path }} {{ file.name }}
      </li> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import NavBar from './NavBar.vue';
import { FileSystemFile } from '../load/filesystem';
import { SamoState } from '../app/state';

// import Fs from './Fs.vue';
// console.log('👋 This message is being logged by "App.vue", included via Vite');

const image = shallowRef('');
const appState = ref<SamoState>();
async function showImage(file: FileSystemFile) {
  image.value = await window.api.getImage({ ...file });
}

window.api.getAppState().then((state) => {
  appState.value = state;
  window.api.onAppStateChanged().then((state) => {
    appState.value = state;
  });
});
</script>
