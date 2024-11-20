import {Link, Navigate, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {getRecipe} from '../../services/recipes.ts';
import {getProducts} from '../../services/products.ts';
import Loader from '../../components/Loader/Loader.tsx';

import styles from './Recipe.module.scss';

const Recipe = () => {
  const {t} = useTranslation(['recipes', 'products']);

  const {id} = useParams();

  const {data: recipe, isPending} = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
  });
  const {data: allProducts} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  const products = allProducts?.filter(
    (item) => recipe && recipe.products?.includes(item.id),
  );

  if (isPending) return <Loader />;

  if (!recipe) {
    console.warn('Recipe :: recipe not found');
    return <Navigate to='/recipes' />;
  }

  return (
    <div className={styles.container}>
      <h1>{recipe?.name}</h1>
      {recipe.images.length > 0 && (
        <div className={styles.imageContainer}>
          {recipe.images.map((item) => (
            <div key={item}>
              <img src={item} alt={item} />
            </div>
          ))}
        </div>
      )}
      {recipe?.description && (
        <section>
          <h2>{t('DESCRIPTION')}</h2>
          <p>{recipe.description}</p>
        </section>
      )}
      <section>
        <h2>{t('INGREDIENTS')}</h2>
        <ul>
          {recipe.ingredients.map((item) => (
            <li key={`ingredient-${item}`}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{t('INSTRUCTION')}</h2>
        <ol>
          {recipe.steps.map((item) => (
            <li key={`step-${item}`}>{item}</li>
          ))}
        </ol>
      </section>
      <section>
        <h2>{t('RELATED_PRODUCTS')}</h2>
        <p>
          {products?.map((item, index) => (
            <>
              <Link key={item.id} to={`/products/${item.id}`}>
                {t(`products:${item.name}`)}
              </Link>
              {index !== products.length - 1 && ' • '}
            </>
          ))}
        </p>
      </section>
      {/*<pre style={{whiteSpace: 'pre-wrap'}}>*/}
      {/*  {JSON.stringify(recipe, null, 2)}*/}
      {/*</pre>*/}
    </div>
  );
};

export default Recipe;
