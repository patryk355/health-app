import {Fragment, useEffect, useState} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@tanstack/react-query';

import {getProduct} from '../../services/products.ts';
import {getRecipes} from '../../services/recipes.ts';
import MineralTable from '../../features/ProductDetails/MineralTable.tsx';
import GoodnessTable from '../../features/ProductDetails/GoodnessTable.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import PhotoIcon from '../../assets/icons/PhotoIcon.tsx';
import {CheckCircleIcon} from '../../assets/icons/CheckIcon.tsx';
import {CloseCircleIcon} from '../../assets/icons/CloseIcon.tsx';

import styles from './Product.module.scss';

const Product = () => {
  const {t} = useTranslation(['products', 'minerals', 'goodness']);

  const {id} = useParams();

  const {data: product, isPending} = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });
  const {data: allRecipes} = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(true),
  });
  const recipes = allRecipes?.filter(
    (item) => product && product?.recipes?.includes(item.id),
  );

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!product) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        product.images.length - 1 === prev ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [product]);

  if (isPending) {
    return <Loader />;
  }

  if (!product) {
    console.warn('Product :: product not found');
    return <Navigate to='/products' />;
  }

  const advantages = product?.advantages
    .split(';')
    .filter((item) => item.trim().length > 0)
    .map((item) => item.trim());
  const disadvantages = product?.disadvantages
    .split(';')
    .filter((item) => item.trim().length > 0)
    .map((item) => item.trim());
  const contraindications = product?.contraindications
    .split(';')
    .filter((item) => item.trim().length > 0)
    .map((item) => item.trim());

  return (
    <div className={styles.container}>
      <h1>{t(product.name)}</h1>
      <div className={styles.imageContainer}>
        <div>
          {product.images[currentImageIndex] ? (
            <img src={product.images[currentImageIndex]} alt={product.name} />
          ) : (
            <PhotoIcon />
          )}
        </div>
        {product.description && <p>{product.description}</p>}
      </div>
      <div className={styles.prosAndCons}>
        {advantages?.length > 0 && (
          <div className={styles.pros}>
            <span>
              <h2>{t('ADVANTAGES')}</h2>
              <CheckCircleIcon />
            </span>
            <ul>
              {advantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {disadvantages?.length > 0 && (
          <div className={styles.cons}>
            <span>
              <h2>{t('DISADVANTAGES')}</h2>
              <CloseCircleIcon />
            </span>
            <ul>
              {disadvantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {contraindications && (
        <>
          <h2>{t('CONTRAINDICATIONS')}</h2>
          <ul>
            {contraindications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      <div className={styles.mineralsAndGoodness}>
        <MineralTable product={product} />
        <GoodnessTable product={product} />
      </div>
      {recipes && recipes.length > 0 && (
        <>
          <h2>{t('RELATED_RECIPES')}</h2>
          <p>
            {recipes.map((item, index) => (
              <Fragment key={item.id}>
                <Link to={`/recipes/${item.id}`}>{item.name}</Link>
                {index !== recipes.length - 1 && ' • '}
              </Fragment>
            ))}
          </p>
        </>
      )}
      {/*<pre style={{whiteSpace: 'pre-wrap'}}>*/}
      {/*  {JSON.stringify(product, null, 2)}*/}
      {/*</pre>*/}
    </div>
  );
};

export default Product;
