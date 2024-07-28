// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { PathLike } from 'fs';
// import { IpcMainEvent } from 'electron';
import { Ipc } from './shared/constants';
import { LocationUpdateCallback } from './interface.d';

// interface ILocationUpdateEvent extends IpcMainEvent {
//   path: string;
//   images: FileSystemFile[]; // Assuming FileSystemFile is an array in this context
// }

contextBridge.exposeInMainWorld('api', {
  chooseDirectory: async () => ipcRenderer.invoke(Ipc.OPEN_DIR_DIALOG),
  setDirectory: async (path: string) => ipcRenderer.invoke(Ipc.OPEN_DIR, path),
  listDirectory: async (path: string) => ipcRenderer.invoke(Ipc.LIST_DIR, path),
  getAppState: async () => {
    return await ipcRenderer.invoke(Ipc.GET_APP_STATE);
  },
  onAppStateChanged: async (callback: AppStateUpdateCallback) => {
    return await ipcRenderer.on(Ipc.APP_STATE_UPDATE, (event, state) => {
      callback(state);
    });
  },
  getImage: async (path: PathLike) => {
    return await ipcRenderer.invoke(Ipc.GET_IMAGE, path);
  },
  onLocationUpdate: (callback: LocationUpdateCallback) => {
    ipcRenderer.on(Ipc.LOCATION_UPDATE, (event, path, images) =>
      callback(path, images),
    );
  },
});
