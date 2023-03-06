import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Nav from '@components/Nav';

const App = () => (
  <>
    <Header />
    <Outlet />
    <Nav />
  </>
);

export default App;
