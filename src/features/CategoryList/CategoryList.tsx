import {useTranslation} from 'react-i18next';
import {List} from '@mui/material';
import {Link} from 'react-router-dom';

import {Category} from '../../types/category.ts';

import styles from './CategoryList.module.scss';

interface CategoryListProps {
  categories: Category[];
  currentCategory: null | undefined | Category;
}

const CategoryList = ({categories, currentCategory}: CategoryListProps) => {
  const {t} = useTranslation('products');

  return (
    <List className={styles.categories}>
      {categories.map((category) => (
        <Link
          key={`category-${category.id}`}
          to={`/products?category=${category.name}`}
          className={`${styles.category} ${currentCategory?.id === category.id && styles.active}`}
        >
          <p>{t(`CATEGORY_${category.name}`)}</p>
        </Link>
      ))}
    </List>
  );
};

export default CategoryList;
