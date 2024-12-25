import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

import {useUserStore} from '../../store/userStore.ts';
import {updateUser} from '../../services/users.ts';
import PhotoIcon from '../../assets/icons/PhotoIcon.tsx';
import {StarIcon} from '../../assets/icons/StarIcon.tsx';
import {imageValidator} from '../../utils/validators.ts';
import {Product} from '../../types/product.ts';

import styles from './ProductItem.module.scss';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({product}: ProductItemProps) => {
  const {t} = useTranslation('products');

  const user = useUserStore((state) => state.user);

  const isFavorite = user?.favorite_products?.includes(product.id);

  const [image, setImage] = useState<null | string>(null);

  useEffect(() => {
    if (product?.images?.length === 0) {
      setImage(null);
      return;
    }
    const checkImage = async () => {
      for (const image of product.images) {
        const isValid = await imageValidator(image);
        if (isValid) {
          setImage(image);
          return;
        } else {
          console.warn('ProductItem :: invalid image', product.name, image);
        }
      }
    };

    checkImage();
  }, [product.images, product.name]);

  const updateFavoritesHandler = async () => {
    if (!user) return;
    let favorites = user.favorite_products;
    if (isFavorite) {
      favorites = favorites.filter((id) => id !== product.id);
    } else {
      if (favorites.includes(product.id)) return;
      favorites.push(product.id);
    }

    try {
      const result = await updateUser(user.id, {favorite_products: favorites});
      console.debug('ProductItem :: updateFavoritesHandler', result);
      toast.success(t('FAVORITES_UPDATE_SUCCESS'));
    } catch (error) {
      console.error('ProductItem :: updateFavoritesHandler', error);
      toast.error(t('FAVORITES_UPDATE_ERROR'));
    }
  };

  return (
    <div key={`product-${product.id}`} className={styles.container}>
      <Link to={`/products/${product.id}`} className={styles.item}>
        <div className={styles.imageContainer}>
          {image ? (
            <img src={image} alt={product.name} />
          ) : (
            <PhotoIcon color='#f1eeee' />
          )}
        </div>
        <span className='center'>{t(product.name)}</span>
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

export default ProductItem;
