import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import PhotoIcon from '../../assets/icons/PhotoIcon.tsx';
import {imageValidator} from '../../utils/validators.ts';
import {Recipe} from '../../types/recipe.ts';

import styles from './RecipeList.module.scss';

interface Props {
  recipe: Recipe;
}

const RecipeItem = ({recipe}: Props) => {
  const [image, setImage] = useState<null | string>(null);

  useEffect(() => {
    if (recipe?.images?.length === 0) {
      setImage(null);
      return;
    }
    const checkImage = async () => {
      for (const image of recipe.images) {
        const isValid = await imageValidator(image);
        if (isValid) {
          setImage(image);
          return;
        } else {
          console.warn('RecipeItem :: invalid image', recipe.name, image);
        }
      }
    };

    checkImage();
  }, [recipe.images, recipe.name]);

  return (
    <Link
      key={`recipe-${recipe.id}`}
      to={`/recipes/${recipe.id}`}
      className={styles.item}
    >
      <div className={styles.imageContainer}>
        {image ? (
          <img src={image} alt={recipe.name} />
        ) : (
          <PhotoIcon color='#f1eeee' />
        )}
      </div>
      <span className='center'>{recipe.name}</span>
    </Link>
  );
};

export default RecipeItem;
