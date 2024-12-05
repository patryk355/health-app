import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import {deleteProduct} from '../../services/products.ts';
import {Product} from '../../types/product.ts';

interface Props {
  product: Product;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DeleteProduct = ({product, open, setOpen}: Props) => {
  const {t} = useTranslation(['products', 'common']);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      navigate('/products');
    },
  });

  const handleDelete = async () => {
    console.debug('DeleteProduct :: handleDelete', product);
    await toast.promise(mutation.mutateAsync(), {
      pending: t('common:PROCESSING'),
      success: t('DELETE_PRODUCT_SUCCESS'),
      error: t('DELETE_PRODUCT_ERROR'),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {t('DELETE_PRODUCT_TITLE')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('DELETE_PRODUCT_DESCRIPTION', {name: t(product.name)})}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='inherit' onClick={handleClose}>
          {t('common:CANCEL')}
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          autoFocus
        >
          {t('common:DELETE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;
