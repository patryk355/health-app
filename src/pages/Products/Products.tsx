import {useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@tanstack/react-query';
import {Button, Checkbox, FormControlLabel} from '@mui/material';

import {useUserStore} from '../../store/userStore.ts';
import CategoryList from '../../features/CategoryList/CategoryList.tsx';
import ProductList from '../../features/ProductList/ProductList.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import {getCategories} from '../../services/categories.ts';
import {getProducts} from '../../services/products.ts';

import styles from './Products.module.scss';

const Products = () => {
  const {t} = useTranslation(['products', 'common']);

  const user = useUserStore((state) => state.user);

  const {data: categories, isPending: isCategoriesPending} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const [searchParams] = useSearchParams();

  const categoryFromSearchParam = searchParams.get('category');
  const currentCategory =
    categories && categoryFromSearchParam
      ? categories.find((category) => category.name === categoryFromSearchParam)
      : null;

  const {data: products, isPending: isProductsPending} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (data) =>
      currentCategory
        ? data.filter((product) => product.category_id === currentCategory?.id)
        : data,
  });

  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className={styles.container}>
      {isCategoriesPending && <Loader />}
      {categories && (
        <CategoryList
          categories={categories}
          currentCategory={currentCategory}
        />
      )}
      {isProductsPending && <Loader />}
      {products && products.length > 0 && (
        <div className={styles.productListContainer}>
          {user?.role === 'user' && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFavorites}
                  onChange={() => setShowFavorites((prev) => !prev)}
                />
              }
              label={t('SHOW_ONLY_FAVORITES')}
            />
          )}
          {user?.role === 'admin' && (
            <Link to='/products/create' className={styles.addProduct}>
              <Button variant='contained'>{t('ADD_PRODUCT')}</Button>
            </Link>
          )}
          <ProductList
            products={
              showFavorites
                ? products.filter((product) =>
                    user?.favorite_products.includes(product.id),
                  )
                : products
            }
          />
        </div>
      )}
      {products?.length === 0 && <p className='center'>{t('NO_PRODUCTS')}</p>}
    </div>
  );
};

export default Products;
