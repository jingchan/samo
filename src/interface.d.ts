export type AppStateUpdateCallback = (state: SamoState) => void;
export type LocationUpdateCallback = (
  path: string,
  images: FileSystemFile[],
) => void;

export interface IApi {
  chooseDirectory: () => Promise<void>;
  setDirectory: (path: string) => Promise<void>;
  listDirectory: (path: string) => Promise<FileSystemFile[]>;
  getAppState: () => Promise<SamoState>;
  onAppStateUpdate: (AppStateUpdateCallback) => void;
  getImage: (file: FileSystemFile) => Promise<string>;
  onLocationUpdate: (LocationUpdateCallback) => void;
}

declare global {
  interface Window {
    api: IApi;
  }
}
