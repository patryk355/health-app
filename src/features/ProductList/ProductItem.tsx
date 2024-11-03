import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import PhotoIcon from '../../assets/icons/PhotoIcon.tsx';
import {imageValidator} from '../../utils/validators.ts';
import {Product} from '../../types/product.ts';

import styles from './ProductList.module.scss';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({product}: ProductItemProps) => {
  const {t} = useTranslation('products');

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
  }, [product.images]);

  return (
    <Link
      key={`product-${product.id}`}
      to={`/products/${product.id}`}
      className={styles.product}
    >
      <div className={styles.imageContainer}>
        {image ? (
          <img src={image} alt={product.name} />
        ) : (
          <PhotoIcon color='#f1eeee' />
        )}
      </div>

      <span className='center'>{t(product.name)}</span>
    </Link>
  );
};

export default ProductItem;
