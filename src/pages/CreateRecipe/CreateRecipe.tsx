import {useTranslation} from 'react-i18next';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import {createRecipe} from '../../services/recipes.ts';
import RecipeForm from '../../features/RecipeForm/RecipeForm.tsx';
import {RecipeFormData} from '../../types/recipe.ts';

const CreateRecipe = () => {
  const navigate = useNavigate();

  const {t} = useTranslation(['recipes', 'common']);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: RecipeFormData) => createRecipe(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      navigate('/recipes');
    },
  });

  const createRecipeHandler = async (data: RecipeFormData) => {
    await toast.promise(mutation.mutateAsync(data), {
      pending: t('common:PROCESSING'),
      success: t('CREATE_RECIPE_SUCCESS'),
      error: t('CREATE_RECIPE_ERROR'),
    });
  };

  return <RecipeForm createAction={createRecipeHandler} />;
};

export default CreateRecipe;
