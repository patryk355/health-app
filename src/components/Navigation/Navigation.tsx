import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import {useUserStore} from '../../store/userStore.ts';
import {UserIcon} from '../../assets/icons/UserIcon.tsx';
import Logo from '../../assets/images/logo.png';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const {t} = useTranslation();

  const {isLogged, user} = useUserStore((state) => state);
  const isAdmin = user?.role === 'admin';

  const pages = useMemo(
    () => [
      {
        path: 'products',
        label: t('PRODUCTS'),
        visible: true,
      },
      {
        path: 'recipes',
        label: t('RECIPES'),
        visible: true,
      },
      {
        path: 'proposals',
        label: t('PROPOSALS'),
        visible: isAdmin,
      },
      {
        path: 'users',
        label: t('USERS'),
        visible: isAdmin,
      },
    ],
    [t, isAdmin],
  );

  const settings = useMemo(
    () => [
      {
        path: 'profile',
        label: t('PROFILE'),
        visible: isLogged,
      },
      {
        path: 'logout',
        label: t('LOGOUT'),
        visible: isLogged,
      },
    ],
    [isLogged, t],
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='static'
      style={{background: 'transparent', boxShadow: 'none'}}
      className={styles.navigation}
    >
      <Container maxWidth='xxl' className={styles.container}>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='p'
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <NavLink to='/'>
              <img src={Logo} alt='logo' style={{width: '120px'}} />
            </NavLink>
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages
                .filter((page) => page.visible)
                .map((page) => (
                  <MenuItem
                    key={`menu_item_${page.path}`}
                    onClick={handleCloseNavMenu}
                  >
                    <NavLink
                      key={`nav_link_${page.path}`}
                      to={page.path}
                      className={({isActive}) =>
                        isActive ? styles.active : ''
                      }
                    >
                      {page.label}
                    </NavLink>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='p'
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <NavLink to='/'>
              <img src={Logo} alt='logo' style={{width: '120px'}} />
            </NavLink>
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages
              .filter((page) => page.visible)
              .map((page) => (
                <NavLink
                  key={`nav_link_${page.path}`}
                  to={page.path}
                  className={({isActive}) => (isActive ? styles.active : '')}
                >
                  {page.label}
                </NavLink>
              ))}
          </Box>

          <Box sx={{flexGrow: 0}}>
            {isLogged ? (
              <>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <span className={styles.avatar}>
                      <UserIcon />
                    </span>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings
                    .filter((setting) => setting.visible)
                    .map((setting) => (
                      <MenuItem
                        key={setting.path}
                        onClick={handleCloseUserMenu}
                      >
                        <Link to={setting.path}>
                          <Typography textAlign='center'>
                            {setting.label}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                </Menu>
              </>
            ) : (
              <Link to='/login'>{t('LOGIN').toUpperCase()}</Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
