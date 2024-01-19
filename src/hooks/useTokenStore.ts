import { useSyncExternalStore } from 'react';
import tokenStore from '../stores/TokenStore';

const store = new tokenStore();

const useTokenStore = () => {
  return useSyncExternalStore(
    (onStoreChange) => {
      store.addListener(onStoreChange);
      return () => store.removeListener(onStoreChange);
    },
    () => store.snapshot,
  );
};

export default useTokenStore;
