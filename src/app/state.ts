import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

const SamoStateFilePath = path.join(__dirname, 'samo.json');

type DirectoryPath = string;

export interface SamoState {
  currentDirectory?: DirectoryPath;
  currentFile?: DirectoryPath;
  explorerOpen?: boolean;
}

const DefaultSamoState: SamoState = {
  explorerOpen: true,
};

export async function saveState(state: SamoState) {
  await writeFile(SamoStateFilePath, JSON.stringify(state, null));
  console.log('State saved:', state);
}

export async function getInitialState(): Promise<SamoState> {
  try {
    const data = await readFile(SamoStateFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, create one.
      saveState(DefaultSamoState);
    } else {
      console.error('Error reading state:', error);
    }
    return DefaultSamoState;
  }
}
