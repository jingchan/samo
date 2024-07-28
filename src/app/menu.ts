import { Menu, MenuItem } from 'electron';

export function createAppMenu() {
  const menu = Menu.getApplicationMenu() || new Menu();
  // const menu = new Menu();
  menu.append(
    new MenuItem({
      label: 'Electron',
      submenu: [
        {
          role: 'help',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: () => {
            console.log('Electron rocks!');
          },
        },
      ],
    }),
  );
  menu.append(
    new MenuItem({
      label: 'Navigation',
      submenu: [
        {
          label: 'Up',
          accelerator: 'K',
          // process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: () => {
            console.log('Up');
          },
        },
        {
          label: 'Down',
          accelerator: 'J',
          // process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: () => {
            console.log('Down');
          },
        },
      ],
    }),
  );

  Menu.setApplicationMenu(menu);
  return menu;
}
