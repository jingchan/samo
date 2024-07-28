import { app, dialog, ipcMain, BrowserWindow } from 'electron';
// Use during development
// import { app, dialog, ipcMain, BrowserWindow } from 'electron/main';

import { createWindow } from './app/window';

import {
  FileSystemFile,
  getImageUrl,
  imagesInDirectory,
} from './load/filesystem';
import { getInitialState, SamoState, saveState } from './app/state';
import { Ipc } from './shared/constants';
import { createAppMenu } from './app/menu';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

interface GlobalState {
  window: BrowserWindow;
  windows: BrowserWindow[];
}

const gstate: GlobalState = {
  window: null,
  windows: [],
};

let state: SamoState = null;

async function setupWindow() {
  console.log('open state', state);
  const window = await createWindow({
    openDevTools: true,
    skipFocusOnOpen: true,
  });
  gstate.window = window;

  if (state.currentDirectory) {
    openDirectory(state.currentDirectory);
  }

  window.on('close', async () => {
    console.log('closing state', state);
    saveState(state);
    gstate.window = null;
    // gstate.windows = gstate.windows.filter((w) => w !== window);
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerHandles();
  state = await getInitialState();
  createAppMenu();

  await setupWindow();
  // registerKeybindings();
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
    // await createWindow();
    await setupWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function registerHandles() {
  ipcMain.handle(Ipc.OPEN_DIR_DIALOG, async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (result.canceled || result.filePaths.length < 1) {
      return [];
    }
    const path = result.filePaths[0];
    return openDirectory(path);
  });
  ipcMain.handle(Ipc.LIST_DIR, async (event, path: string) => {
    // check path is string
    if (typeof path !== 'string') {
      return [];
    }
    return openDirectory(path);
  });
  ipcMain.handle(Ipc.GET_IMAGE, async (event, file: FileSystemFile) => {
    console.log('main', file);
    return getImageUrl(file);
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
  ipcMain.handle(Ipc.GET_APP_STATE, async () => {
    return state;
  });
}

async function openDirectory(path: string) {
  console.log('Chosen directory:', path);
  state.currentDirectory = path;
  ipcMain.emit(Ipc.APP_STATE_UPDATE, state);

  const images = await imagesInDirectory(path);

  return images;
}
