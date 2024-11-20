import RecipeItem from './RecipeItem.tsx';
import {Recipe} from '../../types/recipe.ts';

import styles from './RecipeList.module.scss';

interface Props {
  recipes: Recipe[];
}

const RecipeList = ({recipes}: Props) => {
  return (
    <div className={styles.container}>
      {recipes.map((recipe) => (
        <RecipeItem key={`recipe_${recipe.id}`} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
