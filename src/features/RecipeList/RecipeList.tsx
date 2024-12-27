import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Button, Checkbox, FormControlLabel} from '@mui/material';

import {useUserStore} from '../../store/userStore.ts';
import RecipeItem from './RecipeItem.tsx';
import {Recipe} from '../../types/recipe.ts';

import styles from './RecipeList.module.scss';

interface Props {
  recipes: Recipe[];
  showAddButton?: boolean;
}

const RecipeList = ({recipes, showAddButton}: Props) => {
  const {t} = useTranslation(['recipes', 'common']);

  const {isLogged, user} = useUserStore((state) => state);

  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div>
          {user?.role === 'user' && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFavorites}
                  onChange={() => setShowFavorites((prev) => !prev)}
                />
              }
              label={t('common:SHOW_ONLY_FAVORITES')}
            />
          )}
        </div>
        {isLogged && showAddButton && (
          <Link to={'/recipes/create'}>
            <Button variant='contained'>{t('ADD_RECIPE')}</Button>
          </Link>
        )}
      </div>
      <div>
        {recipes
          .filter((recipe) =>
            showFavorites ? user?.favorite_recipes.includes(recipe.id) : true,
          )
          .map((recipe) => (
            <RecipeItem key={`recipe_${recipe.id}`} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

export default RecipeList;
