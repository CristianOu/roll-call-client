import { Outlet } from 'react-router-dom';
import SideBar from '../side-bar/SideBar';

const Layout = () => {
  return (
    <main className="App">
      <SideBar className="side-bar-container" />
      <Outlet />
    </main>
  );
};

export default Layout;
