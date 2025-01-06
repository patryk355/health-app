import {useEffect} from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';

import Navigation from './components/Navigation/Navigation.tsx';
import CreateProduct from './pages/CreateProduct/CreateProduct.tsx';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe.tsx';
import EditRecipe from './pages/EditRecipe/EditRecipe.tsx';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Logout from './pages/Logout/Logout.tsx';
import Product from './pages/Product/Product.tsx';
import Products from './pages/Products/Products.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Recipe from './pages/Recipe/Recipe.tsx';
import Recipes from './pages/Recipes/Recipes.tsx';
import Register from './pages/Register/Register.tsx';
import Users from './pages/Users/Users.tsx';

import axios, {getErrorText} from './services/axios.ts';
import {getMinerals} from './services/minerals.ts';
import {getGoodness} from './services/goodness.ts';
import {useUserStore} from './store/userStore.ts';
import NoRouteFound from './features/NoRouteFound/NoRouteFound.tsx';
import {
  loginLoader,
  protectedAdminLoader,
  protectedLoader,
} from './utils/loaders.ts';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    errorElement: NoRouteFound,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            Component: Products,
          },
          {
            path: 'create',
            loader: protectedAdminLoader,
            Component: CreateProduct,
          },
          {
            path: ':id',
            Component: Product,
          },
        ],
      },
      {
        path: 'recipes',
        children: [
          {
            index: true,
            Component: () => <Recipes active={true} />,
          },
          {
            path: 'create',
            loader: protectedLoader,
            Component: CreateRecipe,
          },
          {
            path: ':id',
            children: [
              {
                index: true,
                Component: Recipe,
              },
              {
                path: 'edit',
                loader: protectedAdminLoader,
                Component: EditRecipe,
              },
            ],
          },
        ],
      },
      {
        path: 'proposals',
        loader: protectedAdminLoader,
        Component: () => <Recipes active={false} />,
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
      {
        path: 'users',
        loader: protectedAdminLoader,
        Component: Users,
      },
    ],
  },
]);

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

  useEffect(() => {
    getMinerals();
    getGoodness();
  }, []);

  return <RouterProvider router={router} />;
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 576,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  palette: {
    primary: deepOrange,
    mode: 'dark',
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
        <ToastContainer theme='dark' />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
