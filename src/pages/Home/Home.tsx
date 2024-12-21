import {useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';

import {useUserStore} from '../../store/userStore.ts';
import {getRandomRecipe} from '../../services/recipes.ts';
import RandomRecipe from '../../features/RandomRecipe/RandomRecipe.tsx';
import VegetablesImage from '../../assets/images/vegetables.png';
import RecipeBookImage from '../../assets/images/recipe_book.png';
import {Recipe} from '../../types/recipe.ts';

import styles from './Home.module.scss';

const Home = () => {
  const {t} = useTranslation(['homepage', 'common']);
  const isLogged = useUserStore((state) => state.isLogged);

  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => getRandomRecipe(),
    onSuccess: (result) => {
      setRandomRecipe(result);
    },
  });

  const handleDraw = async () => {
    await toast.promise(mutateAsync(), {
      pending: t('common:PROCESSING'),
      success: t('RANDOM_RECIPE_SUCCESS'),
      error: t('RANDOM_RECIPE_ERROR'),
    });
  };

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
        {randomRecipe && <RandomRecipe recipe={randomRecipe} />}
        <Button
          variant='contained'
          color='success'
          style={{color: '#fff'}}
          disabled={isPending}
          onClick={handleDraw}
        >
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
