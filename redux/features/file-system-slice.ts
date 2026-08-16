import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string; // For text files
  imageSrc?: string; // For image files
  isSystem?: boolean; // Protect system folders from deletion
}

export interface FileSystemState {
  [path: string]: FileNode;
}

const initialState: FileSystemState = {
  '/home/daniel235': {
    name: 'daniel235',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Desktop': {
    name: 'Desktop',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Documents': {
    name: 'Documents',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Downloads': {
    name: 'Downloads',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Music': {
    name: 'Music',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Pictures': {
    name: 'Pictures',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Videos': {
    name: 'Videos',
    type: 'directory',
    isSystem: true,
  },
  '/home/daniel235/Desktop/Welcome.txt': {
    name: 'Welcome.txt',
    type: 'file',
    content: `Welcome to Samuel Emmanuel's Ubuntu Portfolio!

This is a fully simulated Linux environment built with React, Next.js, and Tailwind CSS.

Features you can explore:
1. Nautilus Files App - Browse folders, open text/image files.
2. Gnome Text Editor (gedit) - Double click files here or in the file browser, edit, and click Save.
3. Gnome Image Viewer (eog) - Open pictures and click "Set as Desktop Background" to change the wallpaper.
4. Settings App - Real control center where you can choose backgrounds, adjust volume/brightness, and see system info.
5. Synced Terminal - Run commands like 'ls', 'cd', 'mkdir', 'touch', 'rm', 'cat', 'neofetch', or open applications with 'gedit file.txt' or 'files'.
6. Desktop Context Menu - Right click on the wallpaper to create folders or files, open terminal, or go to background settings.
7. Lock Screen - Click 'Lock' from the top right status dropdown to lock your screen.

Enjoy exploring!`,
  },
  '/home/daniel235/Documents/about_me.txt': {
    name: 'about_me.txt',
    type: 'file',
    content: `Hi there! I'm Samuel Emmanuel.

I'm a Full Stack Software Engineer specializing in Web2 product development, customer support ticketing platforms, and scalable backend/frontend architectures.

Core Stack: Golang, Nuxt.js, Vue.js, React/Next.js, Python/Django, Node.js, PostgreSQL, MySQL, AWS Cloud, and Physical Enterprise Server Deployments (eSupport NG Ltd, NIMC, NELFUND, University of Ibadan).

* Web3 & Decentralized Technologies (Ethereum, Polkadot, Solidity, Rust) serve as a specialized complementary skill asset.

Check out the About Me app or run 'neofetch' in the Terminal for system & professional details!`,
  },
  '/home/daniel235/Documents/contact.txt': {
    name: 'contact.txt',
    type: 'file',
    content: `Contact Information:

Name: Samuel Emmanuel (Daniel235)
Role: Full Stack Software Engineer (Web2 Product & Systems Specialist)
Location: Abuja / Lagos, Nigeria
Company: eSupport NG Ltd
GitHub: https://github.com/Daniel235-web
LinkedIn: https://linkedin.com/in/samuel-emmanuel`,
  },
  '/home/daniel235/Pictures/profile.jpg': {
    name: 'profile.jpg',
    type: 'file',
    imageSrc: '/myImage.jpeg',
  },
  '/home/daniel235/Pictures/wallpaper-classic.jpg': {
    name: 'wallpaper-classic.jpg',
    type: 'file',
    imageSrc: '/images/wall-1.webp',
  },
  '/home/daniel235/Pictures/wallpaper-default.jpg': {
    name: 'wallpaper-default.jpg',
    type: 'file',
    imageSrc: '/images/wall-2.webp',
  },
  '/home/daniel235/Pictures/wallpaper-jammy.jpg': {
    name: 'wallpaper-jammy.jpg',
    type: 'file',
    imageSrc: '/images/wall-3.webp',
  },
  '/home/daniel235/Pictures/wallpaper-jellyfish.jpg': {
    name: 'wallpaper-jellyfish.jpg',
    type: 'file',
    imageSrc: '/images/wall-5.webp',
  },
  '/home/daniel235/Pictures/setup-1.jpg': {
    name: 'setup-1.jpg',
    type: 'file',
    imageSrc: '/images/setup-1.jpg',
  },
  '/home/daniel235/Pictures/setup-2.jpg': {
    name: 'setup-2.jpg',
    type: 'file',
    imageSrc: '/images/setup-2.jpg',
  },
  '/home/daniel235/Pictures/screenshot.png': {
    name: 'screenshot.png',
    type: 'file',
    imageSrc: '/screenshot.png',
  },
};

export const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    createFile: (
      state,
      action: PayloadAction<{
        path: string;
        name: string;
        content?: string;
        imageSrc?: string;
      }>,
    ) => {
      const { path, name, content = '', imageSrc } = action.payload;
      const fullPath = path.endsWith('/')
        ? `${path}${name}`
        : `${path}/${name}`;
      if (!state[fullPath]) {
        state[fullPath] = {
          name,
          type: 'file',
          content,
          imageSrc,
        };
      }
    },
    createDirectory: (
      state,
      action: PayloadAction<{ path: string; name: string }>,
    ) => {
      const { path, name } = action.payload;
      const fullPath = path.endsWith('/')
        ? `${path}${name}`
        : `${path}/${name}`;
      if (!state[fullPath]) {
        state[fullPath] = {
          name,
          type: 'directory',
        };
      }
    },
    deleteNode: (state, action: PayloadAction<{ path: string }>) => {
      const { path } = action.payload;
      // Do not allow deleting system nodes
      if (state[path] && state[path].isSystem) {
        return;
      }

      // Delete the node
      delete state[path];

      // Recursively delete children
      const prefix = path.endsWith('/') ? path : `${path}/`;
      Object.keys(state).forEach((key) => {
        if (key.startsWith(prefix)) {
          delete state[key];
        }
      });
    },
    updateFileContent: (
      state,
      action: PayloadAction<{ path: string; content: string }>,
    ) => {
      const { path, content } = action.payload;
      if (state[path] && state[path].type === 'file') {
        state[path].content = content;
      }
    },
    renameNode: (
      state,
      action: PayloadAction<{
        oldPath: string;
        newPath: string;
        newName: string;
      }>,
    ) => {
      const { oldPath, newPath, newName } = action.payload;

      if (!state[oldPath] || state[oldPath].isSystem) {
        return;
      }

      const oldNode = state[oldPath];

      // Delete the old key and create the new key
      delete state[oldPath];
      state[newPath] = {
        ...oldNode,
        name: newName,
      };

      // If it's a directory, we must rename all child paths recursively!
      if (oldNode.type === 'directory') {
        const oldPrefix = oldPath.endsWith('/') ? oldPath : `${oldPath}/`;
        const newPrefix = newPath.endsWith('/') ? newPath : `${newPath}/`;

        Object.keys(state).forEach((key) => {
          if (key.startsWith(oldPrefix)) {
            const relativePath = key.slice(oldPrefix.length);
            const childNewPath = `${newPrefix}${relativePath}`;
            const childNode = state[key];
            delete state[key];
            state[childNewPath] = childNode;
          }
        });
      }
    },
  },
});

export const {
  createFile,
  createDirectory,
  deleteNode,
  updateFileContent,
  renameNode,
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
