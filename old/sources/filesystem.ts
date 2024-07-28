// import {PathLike} from 'node:fs';
import fs from 'node:fs';
import { readdir, opendir, access } from 'node:fs/promises';

const imageExtensions = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'bmp',
  'webp',
  'svg',
  'tiff',
  'arw',
];

// File interface
export interface File {
  name: string;
  path: string;
  // size: number;
  isDirectory: boolean;
  isFile: boolean;
}

export class FileSystemFile implements File {
  constructor(private dirEntry: fs.Dirent) {}

  get name(): string {
    return this.dirEntry.name;
  }
  get path(): string {
    return this.dirEntry.path;
  }
  get isDirectory(): boolean {
    return this.dirEntry.isDirectory();
  }
  get isFile(): boolean {
    return this.dirEntry.isFile();
  }

  // Returns the file extension.
  get extension(): string | undefined {
    if (this.name.indexOf('.')) {
      return this.name.split('.').pop();
    }
    return undefined;
  }

  // Returns `true` if the file is an image.
  isImage(): boolean {
    return imageExtensions.includes(this.extension?.toLowerCase());
  }

  // Returns the file size in bytes.
  async size(): Promise<number> {
    const stats = await fs.promises.stat(this.path);
    return stats.size;
  }
}

export async function* filesInDirectoryIter(
  path: fs.PathLike,
): AsyncGenerator<FileSystemFile> {
  const dir = await opendir(path, { recursive: true });
  for await (const dirent of dir) {
    yield new FileSystemFile(dirent);
  }
}

export async function filesInDirectory(path: fs.PathLike) {
  const files = [];
  for await (const file of filesInDirectoryIter(path)) {
    files.push(file);
  }
  return files;
}

export async function imagesInDirectory(path: fs.PathLike) {
  const files = [];
  for await (const file of filesInDirectoryIter(path)) {
    if (file.isImage()) files.push(file);
  }
  return files;
}
