import ProductItem from './ProductItem.tsx';
import {Product} from '../../types/product.ts';

import styles from './ProductList.module.scss';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({products}: ProductListProps) => {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
