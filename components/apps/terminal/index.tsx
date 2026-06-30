'use client';

import React, {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  closeApp,
  openAppByTitle,
  openAppWithPath,
} from '@/redux/features/all-apps-slice';
import {
  createFile,
  createDirectory,
  deleteNode,
} from '@/redux/features/file-system-slice';

interface TerminalProps {
  id: string;
}

const Terminal = ({ id }: TerminalProps) => {
  const dispatch = useAppDispatch();
  const fileSystem = useAppSelector((state) => state.fileSystem);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentPath, setCurrentPath] = useState<string>('/home/daniel235');
  const [terminalRows, setTerminalRows] = useState<
    {
      text: string;
      focused: boolean;
      disabled: boolean;
      response?: ReactNode;
      directory: string; // The formatted directory shown in prompt
      rawPath: string; // The absolute path of the directory
    }[]
  >([
    {
      text: '',
      focused: true,
      disabled: false,
      response: ``,
      directory: '~',
      rawPath: '/home/daniel235',
    },
  ]);

  // Scroll to bottom on output
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [terminalRows]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newTerminalRows = [...terminalRows];
    newTerminalRows[index].text = e.target.value;
    setTerminalRows(newTerminalRows);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      const newTerminalRows = [...terminalRows];
      newTerminalRows[index].disabled = true;
      newTerminalRows[index].focused = false;
      const text = terminalRows[index].text.trim();

      if (text === 'exit') {
        dispatch(closeApp(id));
        setTerminalRows([
          {
            text: '',
            focused: true,
            disabled: false,
            directory: '~',
            rawPath: '/home/daniel235',
          },
        ]);
        setCurrentPath('/home/daniel235');
      } else if (text === 'clear') {
        const promptDir = getPromptDir(currentPath);
        setTerminalRows([
          {
            text: '',
            focused: true,
            disabled: false,
            directory: promptDir,
            rawPath: currentPath,
          },
        ]);
      } else {
        const response = handleResponse(text);
        newTerminalRows[index].response = response.response;

        // Update local path and prompt dir if directory changed
        const nextPath = response.nextPath || currentPath;
        if (response.nextPath) {
          setCurrentPath(response.nextPath);
        }

        const nextPromptDir = getPromptDir(nextPath);

        newTerminalRows.push({
          text: '',
          focused: true,
          disabled: false,
          directory: nextPromptDir,
          rawPath: nextPath,
        });
        setTerminalRows(newTerminalRows);
      }
    }
  };

  // Helper to format prompt directory
  const getPromptDir = (path: string) => {
    if (path === '/home/daniel235') return '~';
    if (path.startsWith('/home/daniel235/')) {
      return `~/${path.slice('/home/daniel235/'.length)}`;
    }
    return path;
  };

  // Helper to resolve relative or absolute paths
  const resolvePath = (target: string) => {
    if (target === '~' || target === '') return '/home/daniel235';
    if (target.startsWith('/')) {
      return target.replace(/\/$/, '') || '/';
    }

    const parts = currentPath.split('/').filter((p) => p !== '');
    const targetParts = target.split('/').filter((t) => t !== '');

    for (const part of targetParts) {
      if (part === '.') continue;
      if (part === '..') {
        parts.pop();
      } else {
        parts.push(part);
      }
    }
    return '/' + parts.join('/');
  };

  // Main Command Handler
  const handleResponse = (
    inputLine: string,
  ): { response: ReactNode; nextPath?: string } => {
    const args = inputLine.split(' ').filter((a) => a !== '');
    if (args.length === 0) {
      return { response: '' };
    }

    const command = args[0];
    const rest = args.slice(1);

    switch (command) {
      case 'help':
        return {
          response: (
            <div className="whitespace-pre-wrap font-mono leading-relaxed text-zinc-300">
              <span className="font-bold text-green-500">
                Ubuntu simulated terminal. Available commands:
              </span>
              <br />
              <span className="font-bold text-yellow-400">help</span> - List
              available commands
              <br />
              <span className="font-bold text-yellow-400">ls [-l]</span> - List
              directory contents
              <br />
              <span className="font-bold text-yellow-400">cd [dir]</span> -
              Change current directory
              <br />
              <span className="font-bold text-yellow-400">pwd</span> - Print
              working directory
              <br />
              <span className="font-bold text-yellow-400">cat [file]</span> -
              View text file contents
              <br />
              <span className="font-bold text-yellow-400">touch [file]</span> -
              Create an empty file
              <br />
              <span className="font-bold text-yellow-400">mkdir [dir]</span> -
              Create a directory
              <br />
              <span className="font-bold text-yellow-400">rm [path]</span> -
              Remove file or directory
              <br />
              <span className="font-bold text-yellow-400">neofetch</span> -
              Display system information
              <br />
              <span className="font-bold text-yellow-400">
                gedit [file]
              </span> /{' '}
              <span className="font-bold text-yellow-400">nano [file]</span> -
              Edit file in text editor app
              <br />
              <span className="font-bold text-yellow-400">clear</span> - Clear
              the terminal
              <br />
              <span className="font-bold text-yellow-400">exit</span> - Close
              terminal window
              <br />
              <span className="font-bold text-green-500">
                App shortcuts:
              </span>{' '}
              files, settings, calc, spotify, chrome, code
            </div>
          ),
        };

      case 'pwd':
        return {
          response: (
            <div className="font-mono text-zinc-300">{currentPath}</div>
          ),
        };

      case 'whoami':
        return {
          response: <div className="font-mono text-zinc-300">daniel235</div>,
        };

      case 'cd': {
        const targetDir = rest.join(' ');
        const resolved = resolvePath(targetDir);

        if (!fileSystem[resolved]) {
          return {
            response: (
              <div className="font-mono text-red-400">
                bash: cd: {targetDir || '~'}: No such file or directory
              </div>
            ),
          };
        }
        if (fileSystem[resolved].type !== 'directory') {
          return {
            response: (
              <div className="font-mono text-red-400">
                bash: cd: {targetDir}: Not a directory
              </div>
            ),
          };
        }
        return { response: '', nextPath: resolved };
      }

      case 'ls': {
        const isLong = rest.includes('-l') || rest.includes('-la');
        const parentPrefix = currentPath === '/' ? '/' : `${currentPath}/`;

        const children = Object.keys(fileSystem)
          .filter((path) => {
            if (!path.startsWith(parentPrefix) || path === currentPath)
              return false;
            const relative = path.slice(parentPrefix.length);
            return relative.length > 0 && !relative.includes('/');
          })
          .map((path) => ({
            path,
            node: fileSystem[path],
          }));

        if (children.length === 0) {
          return { response: '' };
        }

        if (isLong) {
          return {
            response: (
              <div className="whitespace-pre font-mono leading-tight text-zinc-300">
                {`total ${children.length * 4}\n`}
                {children.map(({ node }) => {
                  const perms =
                    node.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
                  const colorClass =
                    node.type === 'directory'
                      ? 'text-blue-400 font-bold'
                      : 'text-zinc-200';
                  return (
                    <span key={node.name}>
                      {perms} 2 daniel235 daniel235 4096 Jun 28 16:00{' '}
                      <span className={colorClass}>{node.name}</span>
                      {'\n'}
                    </span>
                  );
                })}
              </div>
            ),
          };
        }

        return {
          response: (
            <div className="flex flex-wrap gap-4 font-mono text-zinc-300">
              {children.map(({ node }) => {
                const colorClass =
                  node.type === 'directory'
                    ? 'text-blue-400 font-bold'
                    : 'text-zinc-200';
                return (
                  <span key={node.name} className={colorClass}>
                    {node.name}
                  </span>
                );
              })}
            </div>
          ),
        };
      }

      case 'cat': {
        if (rest.length === 0) {
          return {
            response: (
              <div className="font-mono text-zinc-400">
                Usage: cat [filename]
              </div>
            ),
          };
        }
        const filename = rest.join(' ');
        const resolved = resolvePath(filename);
        const fileNode = fileSystem[resolved];

        if (!fileNode) {
          return {
            response: (
              <div className="font-mono text-red-400">
                cat: {filename}: No such file or directory
              </div>
            ),
          };
        }
        if (fileNode.type === 'directory') {
          return {
            response: (
              <div className="font-mono text-red-400">
                cat: {filename}: Is a directory
              </div>
            ),
          };
        }
        if (fileNode.imageSrc) {
          return {
            response: (
              <div className="font-mono text-yellow-500">
                cat: {filename}: Cannot read binary data. Open with
                &apos;files&apos; or double-click to view.
              </div>
            ),
          };
        }
        return {
          response: (
            <div className="whitespace-pre-wrap font-mono leading-relaxed text-zinc-200">
              {fileNode.content || ''}
            </div>
          ),
        };
      }

      case 'touch': {
        if (rest.length === 0) {
          return {
            response: (
              <div className="font-mono text-zinc-400">
                Usage: touch [filename]
              </div>
            ),
          };
        }
        const filename = rest.join(' ');
        const resolved = resolvePath(filename);
        if (fileSystem[resolved]) {
          return { response: '' }; // file already exists, updates modified timestamp in real systems
        }
        dispatch(
          createFile({ path: currentPath, name: filename, content: '' }),
        );
        return { response: '' };
      }

      case 'mkdir': {
        if (rest.length === 0) {
          return {
            response: (
              <div className="font-mono text-zinc-400">
                Usage: mkdir [dirname]
              </div>
            ),
          };
        }
        const dirname = rest.join(' ');
        const resolved = resolvePath(dirname);
        if (fileSystem[resolved]) {
          return {
            response: (
              <div className="font-mono text-red-400">
                mkdir: cannot create directory &apos;{dirname}&apos;: File
                exists
              </div>
            ),
          };
        }
        dispatch(createDirectory({ path: currentPath, name: dirname }));
        return { response: '' };
      }

      case 'rm': {
        const isForce =
          rest.includes('-rf') || rest.includes('-f') || rest.includes('-r');
        const targetArg = rest.filter((a) => !a.startsWith('-')).join(' ');

        if (!targetArg) {
          return {
            response: (
              <div className="font-mono text-zinc-400">
                Usage: rm [-rf] [path]
              </div>
            ),
          };
        }

        const resolved = resolvePath(targetArg);
        const nodeToDelete = fileSystem[resolved];

        if (!nodeToDelete) {
          return {
            response: (
              <div className="font-mono text-red-400">
                rm: cannot remove &apos;{targetArg}&apos;: No such file or
                directory
              </div>
            ),
          };
        }
        if (nodeToDelete.type === 'directory' && !isForce) {
          return {
            response: (
              <div className="font-mono text-red-400">
                rm: cannot remove &apos;{targetArg}&apos;: Is a directory (use
                -rf)
              </div>
            ),
          };
        }
        if (nodeToDelete.isSystem) {
          return {
            response: (
              <div className="font-mono text-red-400">
                rm: cannot remove &apos;{targetArg}&apos;: Permission denied
                (system directory)
              </div>
            ),
          };
        }

        dispatch(deleteNode({ path: resolved }));
        return { response: '' };
      }

      case 'nano':
      case 'gedit': {
        if (rest.length === 0) {
          return {
            response: (
              <div className="font-mono text-zinc-400">
                Usage: {command} [filename]
              </div>
            ),
          };
        }
        const filename = rest.join(' ');
        const resolved = resolvePath(filename);

        // If file doesn't exist, create it first
        if (!fileSystem[resolved]) {
          dispatch(
            createFile({ path: currentPath, name: filename, content: '' }),
          );
        }

        dispatch(openAppWithPath({ slug: 'text-editor', path: resolved }));
        return {
          response: (
            <div className="font-mono text-zinc-400">
              Opening in Gnome Text Editor...
            </div>
          ),
        };
      }

      case 'neofetch':
        return {
          response: (
            <div className="flex select-text gap-6 font-mono leading-relaxed">
              {/* ASCII Logo */}
              <div className="select-none whitespace-pre text-xs font-extrabold text-orange-500">
                {`         _-_
       /     \\
    ,,_\\__   /,,
   /      \\ /   \\
  |        |     |
  |        |     |
   \\      / \\   /
    ''-___/  ''
       \\     /
         -_-`}
              </div>

              {/* System Details */}
              <div className="text-xs text-zinc-300">
                <span className="font-bold text-orange-500">daniel235</span>@
                <span className="font-bold text-orange-500">ubuntu</span>
                <br />
                <span>-------------------------</span>
                <br />
                <span className="font-bold text-orange-400">OS</span>: Ubuntu
                22.04.3 LTS x86_64
                <br />
                <span className="font-bold text-orange-400">Host</span>: Next.js
                Portfolioweb v13.5
                <br />
                <span className="font-bold text-orange-400">Kernel</span>:
                5.15.0-88-generic
                <br />
                <span className="font-bold text-orange-400">Uptime</span>: 4
                hours, 12 mins
                <br />
                <span className="font-bold text-orange-400">Packages</span>:
                1407 (npm)
                <br />
                <span className="font-bold text-orange-400">Shell</span>: bash
                5.1.16
                <br />
                <span className="font-bold text-orange-400">Resolution</span>:
                1920x1080
                <br />
                <span className="font-bold text-orange-400">DE</span>: GNOME
                42.9
                <br />
                <span className="font-bold text-orange-400">WM</span>: Mutter
                (Wayland)
                <br />
                <span className="font-bold text-orange-400">Theme</span>:
                Yaru-dark [GTK2/3]
                <br />
                <span className="font-bold text-orange-400">Terminal</span>:
                Gnome-Terminal (v22.04)
                <br />
                <span className="font-bold text-orange-400">CPU</span>: AMD
                Ryzen 7 5800H (8) @ 3.20GHz
                <br />
                <span className="font-bold text-orange-400">GPU</span>: AMD
                Radeon Graphics
                <br />
                <span className="font-bold text-orange-400">Memory</span>:
                4832MiB / 16384MiB (29%)
              </div>
            </div>
          ),
        };

      // App shortcuts
      case 'files':
        dispatch(openAppByTitle('files'));
        return {
          response: (
            <div className="font-mono text-zinc-400">Opening Files...</div>
          ),
        };
      case 'settings':
        dispatch(openAppByTitle('settings'));
        return {
          response: (
            <div className="font-mono text-zinc-400">Opening Settings...</div>
          ),
        };
      case 'calc':
        dispatch(openAppByTitle('calculator'));
        return {
          response: (
            <div className="font-mono text-zinc-400">Opening Calculator...</div>
          ),
        };
      case 'spotify':
        dispatch(openAppByTitle('spotify'));
        return {
          response: (
            <div className="font-mono text-zinc-400">Opening Spotify...</div>
          ),
        };
      case 'chrome':
        dispatch(openAppByTitle('chrome'));
        return {
          response: (
            <div className="font-mono text-zinc-400">Opening Chrome...</div>
          ),
        };
      case 'code':
        dispatch(openAppByTitle('code'));
        return {
          response: (
            <div className="font-mono text-zinc-400">Opening VS Code...</div>
          ),
        };

      default:
        return {
          response: (
            <div className="font-mono text-red-400">
              Command &apos;{command}&apos; not found. Type &apos;help&apos; to
              see available commands.
            </div>
          ),
        };
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-auto bg-zinc-950 p-2 font-mono text-sm font-bold text-white"
    >
      <div className="mb-2 text-xs text-zinc-500">
        Welcome to Ubuntu 22.04 LTS terminal. Type &apos;help&apos; to list
        available commands.
      </div>

      {terminalRows.map((row, index) => (
        <Fragment key={index}>
          <div className="mb-1 flex items-center gap-1">
            <span className="font-bold text-green-500">daniel235@ubuntu</span>
            <span className="font-bold text-white">:</span>
            <span className="font-bold text-blue-500">{row.directory}</span>
            <span className="font-bold text-white">$</span>
            <input
              type="text"
              className="flex-grow border-none bg-zinc-950 font-mono font-bold text-white shadow-none outline-none"
              value={row.text}
              onChange={(e) => onChange(e, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              autoFocus={row.focused}
              disabled={row.disabled}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          {row.response && (
            <div className="mb-2.5 mt-1 select-text">{row.response}</div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export { Terminal };
