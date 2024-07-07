import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.tsx';
import Home from './pages/Home/Home.tsx';
import Profile from './pages/Profile/Profile.tsx';
import {useUserStore} from './store/userStore.ts';

import './App.scss';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'profile',
        loader: protectedLoader,
        Component: Profile,
      },
    ],
  },
]);

function protectedLoader() {
  const isLogged = useUserStore.getState().isLogged;
  if (!isLogged) {
    return redirect('/');
  }
  return null;
}

function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
