import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

import {useUserStore} from '../../store/userStore.ts';
import {updateUser} from '../../services/users.ts';
import {imageValidator} from '../../utils/validators.ts';
import PhotoIcon from '../../assets/icons/PhotoIcon.tsx';
import {StarIcon} from '../../assets/icons/StarIcon.tsx';
import {Recipe} from '../../types/recipe.ts';

import styles from '../ProductList/ProductItem.module.scss';

interface Props {
  recipe: Recipe;
}

const RecipeItem = ({recipe}: Props) => {
  const {t} = useTranslation(['recipes', 'common']);

  const user = useUserStore((state) => state.user);

  const isFavorite = useMemo(
    () => user?.favorite_recipes?.includes(recipe.id),
    [recipe.id, user?.favorite_recipes],
  );

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

  const updateFavoritesHandler = async () => {
    if (!user) return;
    let favorites = user.favorite_recipes;
    if (isFavorite) {
      favorites = favorites.filter((id) => id !== recipe.id);
    } else {
      if (favorites.includes(recipe.id)) return;
      favorites.push(recipe.id);
    }

    try {
      const result = await updateUser(user.id, {favorite_recipes: favorites});
      console.debug('RecipeItem :: updateFavoritesHandler', result);
      toast.success(t('FAVORITES_UPDATE_SUCCESS'));
    } catch (error) {
      console.error('RecipeItem :: updateFavoritesHandler', error);
      toast.error(t('FAVORITES_UPDATE_ERROR'));
    }
  };

  return (
    <div key={`recipe-${recipe.id}`} className={styles.container}>
      <Link to={`/recipes/${recipe.id}`} className={styles.item}>
        <div className={styles.imageContainer}>
          {image ? (
            <img src={image} alt={recipe.name} />
          ) : (
            <PhotoIcon color='#f1eeee' />
          )}
        </div>
        <span className='center'>{recipe.name}</span>
      </Link>
      {user?.role === 'user' && (
        <button
          className={`${styles.star} ${isFavorite ? styles.filled : ''}`}
          title={
            isFavorite
              ? t('common:REMOVE_FROM_FAVORITES')
              : t('common:ADD_TO_FAVORITES')
          }
          onClick={updateFavoritesHandler}
        >
          <StarIcon />
        </button>
      )}
    </div>
  );
};

export default RecipeItem;
