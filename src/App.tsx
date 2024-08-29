import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import {deepOrange} from '@mui/material/colors';

import Navigation from './components/Navigation/Navigation.tsx';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Logout from './pages/Logout/Logout.tsx';
import Products from './pages/Products/Products.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Recipes from './pages/Recipes/Recipes.tsx';
import Register from './pages/Register/Register.tsx';

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
        path: 'register',
        Component: Register,
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

const theme = createTheme({
  palette: {
    primary: deepOrange,
  },
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
