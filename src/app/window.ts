import path from 'node:path';
import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  screen,
} from 'electron';
import { APP_NAME } from '../shared/constants';

interface CreateWindowOptions {
  title?: string;
  windowSize?: Electron.Size;
  windowPosition?: Electron.Point;
  openDevTools?: boolean;

  // This prevents the window from taking focus every time it's opened (e.g. on
  // hot reloads).
  skipFocusOnOpen?: boolean;
}

function getWindowDefaults(): BrowserWindowConstructorOptions {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  return {
    title: APP_NAME,
    width: screenSize.width * 0.3,
    height: screenSize.height,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  };
}

export const createWindow = async (options: CreateWindowOptions = {}) => {
  const windowOptions = getWindowDefaults();
  windowOptions.title = options.title ?? windowOptions.title;
  windowOptions.width = options.windowSize?.width ?? windowOptions.width;
  windowOptions.height = options.windowSize?.height ?? windowOptions.height;
  windowOptions.x = options.windowPosition?.x ?? windowOptions.x;
  windowOptions.y = options.windowPosition?.y ?? windowOptions.y;
  if (options.skipFocusOnOpen) {
    windowOptions.show = false;
  }

  const mainWindow = new BrowserWindow(windowOptions);

  if (options.openDevTools) {
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL, {});
  } else {
    await mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  if (options.skipFocusOnOpen) {
    mainWindow.showInactive();
  }

  return mainWindow;
};
