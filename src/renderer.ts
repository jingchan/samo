/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { createApp } from 'vue';
import App from './present/App.vue';

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);

createApp(App).mount('#app');

// console.log('test', window.document.getElementById('fileInput'));
// // log to console if fileinput changes
// window.document.getElementById('fileInput').addEventListener('change', (e) => {
//   console.log('file input changed', e);
//   console.log('file input changed', e.target);
//   const infile: HTMLInputElement = e.target as HTMLInputElement;
//   console.log('file input changed', infile, infile.files);
// });
// window.document
//   .getElementById('selectDirBtn')
//   .addEventListener('click', async () => {
//     const files = await window.inputApi.chooseDirectory();
//     console.log('files', files);
//   });
