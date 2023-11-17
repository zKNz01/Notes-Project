import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeaderAdmin from '../../components/Admin-Owner/HeaderAdmin';
import Admin from '../../components/Admin-Owner/Admin';

export function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export function BaseLayout2() {
  return (
    <>
      <HeaderAdmin />
      <Admin />
    </>
  );
}
