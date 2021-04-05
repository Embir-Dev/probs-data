const { app, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");
let mainWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.webContents.openDevTools();
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
