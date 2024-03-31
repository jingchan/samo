import { PathLike } from 'node:fs';
import { app, dialog, ipcMain, BrowserWindow } from 'electron/main';

import { createWindow } from './app/window';

import { getImageUrl, imagesInDirectory } from './load/filesystem';
import { getInitialState } from './app/state';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerHandles();
  const state = await getInitialState();
  console.log('Initial state:', state);
  // registerKeybindings();
  const mainWindow = await createWindow({ skipFocusOnOpen: true });

  // await createWindow({
  //   windowPosition: { x: 100, y: 0 },
  // });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function registerHandles() {
  ipcMain.handle('chooseDirectory', async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (result.canceled || result.filePaths.length < 1) return [];
    console.log('Chosen directory:', result.filePaths[0]);
    const images = await imagesInDirectory(result.filePaths[0]);
    // console.log(images);
    return images;
  });
  ipcMain.handle('getImage', async (event, path: PathLike) => {
    if (typeof path !== 'string') return null;
    return getImageUrl(path);
    // const result = await dialog.showOpenDialog({
    //   properties: ['openDirectory'],
    // });
    // if (result.canceled || result.filePaths.length < 1) return [];
    // console.log('Chosen directory:', result.filePaths[0]);
    // const images = await imagesInDirectory(result.filePaths[0]);
    // console.log(images);
    // return images;
    // return path;
  });
}

async function openDirectory(path: string) {
  console.log('Chosen directory:', path);

  return imagesInDirectory(path);
  // console.log(images);
}
