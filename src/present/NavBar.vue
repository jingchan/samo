<template>
  <aside class="overflow-auto">
    <div class="flex items-center justify-between p-4">
      <h1 class="text-xl font-bold">File Explorer</h1>
      <button class="text-gray-300 hover:text-white focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
      </button>
    </div>
    <OpenDirectoryButton @directory-selected="openDirectory" />
    <ul class="flex flex-col p-4 overflow-y-auto">
      <!-- //   <li v-for="(file, index) in files" @click="showImage(file)">
//     {{ index }}. {{ file.path }} {{ file.name }}
//   </li> -->
      <li
        v-for="folder in props.folders"
        :key="folder.name"
        class="mb-2"
        @click="$emit('imageSelected', folder.name)"
      >
        <a
          href="#"
          class="text-sm flex items-center text-gray-500 hover:text-white hover:bg-gray-600"
        >
          <svg
            v-if="folder.type === 'folder'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2.003 5.884a1.001 1.001 0 001.784.114l5.073 2.536a.5.5 0 01-.707.707L4.79 7.114V17a1 1 0 01-1-1V4a1 1 0 011-1h12a1 1 0 011 1v13a1 1 0 01-1 1H2.003z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></svg>
          <span>{{ folder.name }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import OpenDirectoryButton from './OpenDirectoryButton.vue';
import { File } from '../load/filesystem';

const emit = defineEmits(['imageSelected']);

const props = defineProps<{
  files: [File];
  folders: [{ name: string; type: string }];
}>();

const openDirectory = (selectedDir) => {
  console.load(selectedDir);
};
</script>
