import { DB_NAME, INDEXED_DB_VERSION } from '../constants/db';
import { IToken } from '../entities/token';

// IndexedDB를 초기화하고 'tokens'라는 객체 저장소를 생성하는 함수입니다.
export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, INDEXED_DB_VERSION);

    // db version이 바뀌면 트리거 된다.
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('tokens', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject(
        'Database error: ' + (event.target as IDBOpenDBRequest).error?.message,
      );
    };
  });
}

export async function createToken(token: IToken): Promise<void> {
  const db = await initDB();
  const transaction = db.transaction('tokens', 'readwrite');
  const store = transaction.objectStore('tokens');
  store.add(token);
}

export async function readTokens(): Promise<IToken[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('tokens', 'readonly');
    const store = transaction.objectStore('tokens');
    const request = store.getAll();

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest<IToken[]>).result);
    };

    request.onerror = (event: Event) => {
      reject(
        'Error in fetching tokens: ' +
          (event.target as IDBRequest).error?.message,
      );
    };
  });
}

export async function updateToken(
  id: number,
  updatedToken: IToken,
): Promise<void> {
  const db = await initDB();
  const transaction = db.transaction('tokens', 'readwrite');
  const store = transaction.objectStore('tokens');
  const request = store.get(id);

  request.onsuccess = () => {
    store.put({ ...request.result, ...updatedToken });
  };
}

export async function deleteToken(id: number): Promise<void> {
  const db = await initDB();
  const transaction = db.transaction('tokens', 'readwrite');
  const store = transaction.objectStore('tokens');
  store.delete(id);
}
