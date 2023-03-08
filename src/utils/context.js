import {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const defaultStore = {
  closeHeaderHandler: null,
};

export const AppContext = createContext();

export const CxtProvider = ({
  children,
}) => {
  const [store, setStore] = useState(defaultStore);
  const update = (v) => {
    setStore((st) => ({
      ...st,
      ...v,
    }));
  };
  const value = useMemo(() => ({
    store, update,
  }), [store]);

  return (<AppContext.Provider value={value}>{children}</AppContext.Provider>);
};

CxtProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const cxt = useContext(AppContext);

  return [cxt.store, cxt.update];
};
