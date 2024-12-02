import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';

import {deleteUser} from '../../services/users.ts';
import {User} from '../../types/user.ts';

interface Props {
  user: User;
  onClose: () => void;
}

const DeleteUser = ({user, onClose}: Props) => {
  const {t} = useTranslation('users');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      handleClose();
    },
  });

  const handleDelete = async () => {
    console.debug('DeleteUser :: handleDelete', user);
    await toast.promise(mutation.mutateAsync(), {
      pending: t('common:PROCESSING'),
      success: t('DELETE_USER_SUCCESS'),
      error: t('DELETE_USER_ERROR'),
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {t('DELETE_USER_TITLE')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('DELETE_USER_DESCRIPTION', {name: user.username})}
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

export default DeleteUser;
