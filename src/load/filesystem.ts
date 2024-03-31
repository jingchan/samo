// import {PathLike} from 'node:fs';
import fs, { PathLike, Dirent } from 'node:fs';
import { extname } from 'node:path';
import { opendir } from 'node:fs/promises';
import mime from 'mime-types';
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
  name: string;
  path: string;
  isDirectory: boolean;
  isFile: boolean;

  constructor(_dirEntry: Dirent) {
    this.name = _dirEntry.name;
    this.path = _dirEntry.path;
    this.isDirectory = _dirEntry.isDirectory();
    this.isFile = _dirEntry.isFile();
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
  path: PathLike,
): AsyncGenerator<FileSystemFile> {
  const dir = await opendir(path, { recursive: true });
  for await (const dirent of dir) {
    yield new FileSystemFile(dirent);
  }
}

export async function filesInDirectory(path: PathLike) {
  const files = [];
  for await (const file of filesInDirectoryIter(path)) {
    files.push(file);
  }
  return files;
}

export async function imagesInDirectory(path: PathLike) {
  const files = [];
  for await (const file of filesInDirectoryIter(path)) {
    if (file.isImage()) files.push(file);
  }
  return files;
}

export async function getImageUrl(path: string): Promise<string | null> {
  // try {
  //   const buffer = fs.readFileSync(path);
  //   const mimeType = getMimeType(buffer); // Function to determine mime type (explained later)
  //   const base64Data = Buffer.from(buffer).toString('base64');
  //   return `data:${mimeType};base64,${base64Data}`;
  // } catch (error) {
  //   console.error('Error reading image:', error);
  //   return null; // Or return a default data URL for error handling
  // }
  try {
    const buffer = await fs.promises.readFile(path);
    const mimeType = await getMimeType(path);
    const base64Data = Buffer.from(buffer).toString('base64');
    return `data:${mimeType};base64,${base64Data}`;
  } catch (error) {
    console.error('Error reading image:', error);
    return null; // Or return a default data URL for error handling
  }
}

export async function getMimeType(path: string): Promise<string> {
  switch (extname(path)) {
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.webp':
      return 'image/webp';
    case '.bmp':
      return 'image/bmp';
    case '.tiff':
      return 'image/tiff';
    case '.arw':
      return 'image/x-sony-arw';

    default:
      return mime.lookup(path) || 'application/octet-stream';
  }
}
