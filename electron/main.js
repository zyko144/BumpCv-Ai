import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Load backend logic
// Doing a dynamic import because it's an ESM module
let serverInstance;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startBackend() {
  process.env.PORT = '3002'; // Force a specific port for the desktop app
  process.env.NODE_ENV = 'production'; // To serve the dist folder
  process.env.DB_PATH = path.join(app.getPath('userData'), 'bumpcv.db'); // Safe path for SQLite
  // Load the express server from our compiled backend or source
  await import('../server/index.js');
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: 'hiddenInset', // Apple-like
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Wait a little bit for the express server to start, then load the URL
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3002');
  }, 1000);
}

app.whenReady().then(async () => {
  await startBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
