<template>
  <button
    class="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white shadow rounded-md"
    @click="selectDir"
  >
    Open Directory
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits(['directorySelected']);

const selectDir = async () => {
  const dirFiles = await window.inputApi.chooseDirectory();
  emit('directorySelected', dirFiles);
};
</script>
