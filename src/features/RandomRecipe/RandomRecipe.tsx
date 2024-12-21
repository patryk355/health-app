import {Link} from 'react-router-dom';

import PhotoIcon from '../../assets/icons/PhotoIcon.tsx';
import {Recipe} from '../../types/recipe.ts';

import styles from './RandomRecipe.module.scss';

interface Props {
  recipe: Recipe;
}

const RandomRecipe = ({recipe}: Props) => {
  return (
    <Link to={`recipes/${recipe.id}`} className={styles.container}>
      <div className={styles.imageContainer}>
        {recipe.images && recipe.images.length > 0 ? (
          <img src={recipe.images[0]} alt={recipe.name} />
        ) : (
          <PhotoIcon />
        )}
      </div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
    </Link>
  );
};

export default RandomRecipe;
