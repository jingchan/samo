import { globalShortcut } from 'electron';

globalShortcut.register('CommandOrControl+X', () => {
  console.log('Shortcut triggered: CommandOrControl+X');
  // Handle shortcut logic here (e.g., send message to renderer)
});
