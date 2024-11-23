import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';

import {useUserStore} from '../../store/userStore.ts';
import RecipeItem from './RecipeItem.tsx';
import {Recipe} from '../../types/recipe.ts';

import styles from './RecipeList.module.scss';

interface Props {
  recipes: Recipe[];
}

const RecipeList = ({recipes}: Props) => {
  const {t} = useTranslation('recipes');

  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <div className={styles.container}>
      {isLogged && (
        <Link to={'/recipes/create'}>
          <Button variant='contained'>{t('ADD_RECIPE')}</Button>
        </Link>
      )}
      <div>
        {recipes.map((recipe) => (
          <RecipeItem key={`recipe_${recipe.id}`} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
