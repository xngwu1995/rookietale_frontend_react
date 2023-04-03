import {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const defaultStore = {
  closeHeaderHandler: null,
};

export const AppContext = createContext();

export const CxtProvider = ({
  children,
}) => {
  const [store, setStore] = useState(() => {
    const storedStore = localStorage.getItem('store');
    return storedStore ? JSON.parse(storedStore) : defaultStore;
  });

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

  const update = (v) => {
    const newStore = v === 'clear all' ? defaultStore : { ...store, ...v };
    setStore(newStore);
    localStorage.setItem('store', JSON.stringify(newStore));
  };

  const value = useMemo(() => ({
    store, update,
  }), [store]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

CxtProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const cxt = useContext(AppContext);

  return [cxt.store, cxt.update];
};
