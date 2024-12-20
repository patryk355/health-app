import {Trans, useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';

import {useUserStore} from '../../store/userStore.ts';
import VegetablesImage from '../../assets/images/vegetables.png';
import RecipeBookImage from '../../assets/images/recipe_book.png';

import styles from './Home.module.scss';

const Home = () => {
  const {t} = useTranslation(['homepage', 'common']);

  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <div className={styles.container}>
      <section>
        <h2>{t('common:DESCRIPTION')}</h2>
        <p>{t('PAGE_DESCRIPTION')}</p>
        <div className={styles.buttons}>
          <Link to='/products'>
            <img src={VegetablesImage} alt='vegetables' />
            <p>{t('PRODUCTS')}</p>
          </Link>
          <Link to='/recipes'>
            <img src={RecipeBookImage} alt='recipe book' />
            <p>{t('RECIPES')}</p>
          </Link>
        </div>
      </section>
      <section>
        <h2>{t('RANDOM_RECIPE_TITLE')}</h2>
        <p>{t('RANDOM_RECIPE_DESCRIPTION')}</p>
        <Button variant='contained' color='success' style={{color: '#fff'}}>
          {t('DRAW')}
        </Button>
      </section>
      {!isLogged && (
        <section>
          <h2>{t('NOT_LOGGED_USERS_TITLE')}</h2>
          <p>
            <Trans
              i18nKey='homepage:NOT_LOGGED_USERS_DESCRIPTION'
              components={{
                registerLink: <Link to={'/register'} />,
                loginLink: <Link to={'/login'} />,
              }}
            />
          </p>
        </section>
      )}
    </div>
  );
};

export default Home;
