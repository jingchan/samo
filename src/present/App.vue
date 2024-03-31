<template>
  <div class="h-screen w-full flex overflow-hidden">
    <NavBar
      class="w-4/12 bg-gray-800 text-white h-full flex-col"
      :files="files"
      :folders="folders"
      @image-selected="showImage"
    ></NavBar>
    <div class="w-8/12 bg-red-300 flex-v flex-grow overflow-auto">
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <div></div>
      <!-- <span class="w-full wrap">Showing: {{ image }}</span> -->
      <br />
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
// import Fs from './Fs.vue';
console.log('👋 This message is being logged by "App.vue", included via Vite');

const image = shallowRef('');
const files = shallowRef([]);
// const folders = ref([]);
const folders = ref([
  { name: 'Documents', type: 'folder' },
  { name: 'Images', type: 'folder' },
  { name: 'Code', type: 'folder' },
  { name: 'README.md', type: 'file' },
]);
const showImage = async (file) => {
  console.log(file);
  // const path = file.path + '/' + file.name;
  image.value = await window.inputApi.getImage(file);
  // console.log(image.value);
};
</script>
