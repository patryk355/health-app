import {useTranslation} from 'react-i18next';
import {useQuery} from '@tanstack/react-query';

import {getRecipes} from '../../services/recipes.ts';
import Loader from '../../components/Loader/Loader.tsx';
import RecipeList from '../../features/RecipeList/RecipeList.tsx';

const Recipes = () => {
  const {t} = useTranslation('recipes');

  const {data: recipes, isPending} = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(true),
  });

  if (isPending) return <Loader />;

  if (!recipes || recipes?.length === 0) {
    return <p className='center'>{t('NO_RECIPES')}</p>;
  }

  return <RecipeList recipes={recipes} />;
};

export default Recipes;
