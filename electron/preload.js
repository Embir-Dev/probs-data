const { remote, contextBridge } = require("electron");
const storage = require("electron-json-storage");
storage.setDataPath(remote.app.getPath("appData"));
contextBridge.exposeInMainWorld("storage", {
  has: storage.has,
  get: storage.get,
  set: storage.set,
  keys: storage.keys,
  getMany: storage.getMany,
  remove: storage.remove,
});
