import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';

import Navigation from './components/Navigation/Navigation.tsx';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Logout from './pages/Logout/Logout.tsx';
import Products from './pages/Products/Products.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Recipes from './pages/Recipes/Recipes.tsx';

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
        path: 'products',
        Component: Products,
      },
      {
        path: 'recipes',
        Component: Recipes,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'logout',
        Component: Logout,
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
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
