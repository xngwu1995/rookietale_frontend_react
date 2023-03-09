import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderTwitter from '@components/Header';
import { useAppContext } from '@utils/context';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUser } from '@services/login';

const App = () => {
  const [setStore] = useAppContext();
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      const userId = Cookies.get('userId');
      if (!userId) {
        nav('/login');
        return;
      }
      const res = await getUser(userId);
      if (res.data) {
        setStore({
          user: res.data,
        });
        if (location.pathname === '/login') {
          nav('/tweets');
        }
        // return;
      }
      // nav('/login');
    };
    init();
  }, []);

  return (
    <>
      <HeaderTwitter />
      <Outlet />
    </>
  );
};

export default App;
