declare global {
  interface Window {
    storage: {
      has: (key: string, func: Function) => void;
      get: (key: string, func: Function) => void;
      set: (key: string, value: any, func: Function) => void;
      keys: (func: Function) => void;
      getMany: (keys: string[], func: Function) => void;
      remove: (key: string, func: Function) => void;
    };
  }
}

const has = (key: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    window.storage.has(key, (error: string, hasKey: boolean) => {
      if (error) reject(error);
      else resolve(hasKey);
    });
  });
};

const get = <T extends unknown>(key: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    window.storage.get(key, (error: string, data: T) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
};

const set = (key: string, data: unknown): Promise<undefined> => {
  return new Promise((resolve, reject) => {
    window.storage.set(key, data, (error: string) => {
      if (error) reject(error);
      else resolve(undefined);
    });
  });
};

const keys = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    window.storage.keys((error: string, keys: string[]) => {
      if (error) reject(error);
      else resolve(keys);
    });
  });
};

const getMany = <T extends unknown>(keys: string[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    window.storage.getMany(keys, (error: string, data: Record<string, T>) => {
      if (error) reject(error);
      else resolve(Object.values(data));
    });
  });
};

const remove = (key: string) => {
  return new Promise((resolve, reject) => {
    window.storage.remove(key, (error: string) => {
      if (error) reject(error);
      else resolve(undefined);
    });
  });
};
const storage = {
  has,
  get,
  set,
  keys,
  getMany,
  remove,
};
export default storage;
