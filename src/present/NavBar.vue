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
    <OpenDirectoryButton @directory-selected="console.log" />
    <div class="p-2">{{ props.rootDir }}</div>
    <ul class="flex flex-col p-2 overflow-y-auto">
      <li
        v-for="folder in folders"
        :key="folder.path"
        class="mb-2"
        @click="$emit('imageSelected', folder)"
      >
        <a
          href="#"
          class="text-sm flex items-center hover:text-white hover:bg-gray-600"
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
          <span>{{ folder.path }}/{{ folder.name }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import OpenDirectoryButton from './OpenDirectoryButton.vue';
import { FileSystemFile } from '../load/filesystem';
import { ref, watchEffect } from 'vue';

defineEmits(['imageSelected']);
const props = defineProps<{
  rootDir?: string;
}>();

const folders = ref<FileSystemFile[]>();
watchEffect(async () => {
  const res = await window.api.listDirectory(props.rootDir);
  res.sort((a, b) => {
    if (a.path == b.path) {
      return a.name < b.name ? -1 : 1;
    }
    return a.path < b.path ? -1 : 1;
  });
  folders.value = res;
});

// window.api.onLocationUpdate((path: string, images: FileSystemFile[]) => {
//   console.log('onLocationUpdate called', path, images);
//   folders.value = images.map((image) => {
//     console.log(image, image.path);
//     return image;
//   });
// });
</script>
