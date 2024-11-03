import {useEffect} from 'react';
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Navigation from './components/Navigation/Navigation.tsx';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Logout from './pages/Logout/Logout.tsx';
import Products from './pages/Products/Products.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Recipes from './pages/Recipes/Recipes.tsx';
import Register from './pages/Register/Register.tsx';

import axios, {getErrorText} from './services/axios.ts';
import {useUserStore} from './store/userStore.ts';

import './App.scss';

const queryClient = new QueryClient();

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
        loader: loginLoader,
        Component: Login,
      },
      {
        path: 'logout',
        loader: protectedLoader,
        Component: Logout,
      },
      {
        path: 'register',
        loader: loginLoader,
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

function loginLoader() {
  const isLogged = useUserStore.getState().isLogged;
  if (isLogged) {
    return redirect('/');
  }
  return null;
}

function protectedLoader() {
  const isLogged = useUserStore.getState().isLogged;
  if (!isLogged) {
    return redirect('/');
  }
  return null;
}

function App() {
  const {setToken, setUser, setIsLogged} = useUserStore();

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    setToken(token);
    axios
      .get('/users/me')
      .then((response) => {
        if (isMounted) {
          console.debug('App :: getUser', response.data);
          setUser(response.data);
          setIsLogged(true);
        }
      })
      .catch((error) => {
        console.error('App :: getUser', getErrorText(error));
      });

    return () => {
      isMounted = false;
    };
  }, [setIsLogged, setToken, setUser]);

  return <RouterProvider router={router} />;
}

const theme = createTheme({
  palette: {
    primary: deepOrange,
  },
});

function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
