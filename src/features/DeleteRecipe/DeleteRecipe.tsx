import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-toastify';

import {deleteRecipe} from '../../services/recipes.ts';
import {Recipe} from '../../types/recipe.ts';

interface Props {
  recipe: Recipe;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DeleteRecipe = ({recipe, open, setOpen}: Props) => {
  const {t} = useTranslation('recipes');

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (recipeId: number) => {
      toast
        .promise(deleteRecipe(recipeId), {
          pending: t('common:PROCESSING'),
          success: t('DELETE_RECIPE_SUCCESS'),
          error: t('DELETE_RECIPE_ERROR'),
        })
        .then(() => {
          navigate('/recipes');
        });
    },
  });

  const handleDelete = () => {
    console.debug('DeleteRecipe :: handleDelete', recipe);
    mutation.mutate(recipe.id);
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
        {t('DELETE_RECIPE_TITLE')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('DELETE_RECIPE_DESCRIPTION', {name: recipe.name})}
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

export default DeleteRecipe;
