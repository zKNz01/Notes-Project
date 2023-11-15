import All from '../components/All';
import NotFound from '../components/notFound';
import { BaseLayout, BaseLayout2 } from '../layouts/base';
import Reminder from '../components/Reminder';
import Important from '../components/Important';
import Login from '../components/Login/Login';
import Auth from '../components/Auth';

const Routes = [
  {
    path: '/',
    element: <Auth Component={BaseLayout} />,
    children: [
      {
        path: '',
        element: <All />,
      },
      {
        path: '/Reminder',
        element: <Reminder />,
      },
      {
        path: '/Important',
        element: <Important />,
      },
    ],
  },
  {
    path: '/Admin',
    element: <Auth Component={BaseLayout2} />,
  },
  {
    path: '/Login/*',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default Routes;
