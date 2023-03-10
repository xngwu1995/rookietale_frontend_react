import { Outlet, useLocation } from 'react-router-dom';
import HeaderTwitter from '@components/Header';
import { useAppContext } from '@utils/context';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUser } from '@services/login';
import { useGoTo } from '@utils/hooks';

const App = () => {
  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      const userId = Cookies.get('userId');
      if (!userId) {
        go('login');
        return;
      }
      if (store.user) {
        return;
      }
      const res = await getUser(userId);
      if (res.data) {
        setStore({
          user: res.data,
        });
        if (location.pathname === '/login') {
          go('tweets');
        }
        // return;
      }
      // nav('/login');
    };
    init();
  }, [location.pathname]);

  return (
    <>
      <HeaderTwitter />
      <Outlet />
    </>
  );
};

export default App;
