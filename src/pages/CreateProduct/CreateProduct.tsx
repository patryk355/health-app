import {useTranslation} from 'react-i18next';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import {createProduct} from '../../services/products.ts';
import ProductForm from '../../features/ProductForm/ProductForm.tsx';
import {CreateProductData} from '../../types/product.ts';

const CreateProduct = () => {
  const navigate = useNavigate();

  const {t} = useTranslation(['products', 'common']);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: CreateProductData) => createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      navigate('/products');
    },
  });

  const createProductHandler = async (data: CreateProductData) => {
    await toast.promise(mutation.mutateAsync(data), {
      pending: t('common:PROCESSING'),
      success: t('CREATE_PRODUCT_SUCCESS'),
      error: t('CREATE_PRODUCT_ERROR'),
    });
  };

  return <ProductForm createAction={createProductHandler} />;
};

export default CreateProduct;
