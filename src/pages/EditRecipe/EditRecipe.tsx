import {useTranslation} from 'react-i18next';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import RecipeForm from '../../features/RecipeForm/RecipeForm.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import {getRecipe, updateRecipe} from '../../services/recipes.ts';
import {RecipeFormData} from '../../types/recipe.ts';

const EditRecipe = () => {
  const {t} = useTranslation(['recipes', 'common']);

  const {id} = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {data: recipe, isPending} = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
  });

  const mutation = useMutation({
    mutationFn: ({id, formData}: {id: number; formData: RecipeFormData}) =>
      updateRecipe(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      navigate('/recipes');
    },
  });

  const initialData = {
    name: recipe?.name || '',
    description: recipe?.description || '',
    ingredients: Array.isArray(recipe?.ingredients)
      ? recipe?.ingredients
      : [''],
    steps: Array.isArray(recipe?.steps) ? recipe?.steps : [''],
    images: Array.isArray(recipe?.images) ? recipe?.images : [''],
    products: Array.isArray(recipe?.products) ? recipe?.products : [],
    active: recipe?.active || false,
  };

  if (isPending) return <Loader />;

  if (!recipe) {
    console.warn('EditRecipe :: recipe not found', id);
    return <Navigate to='/recipes' />;
  }

  const editRecipeHandler = async (data: RecipeFormData) => {
    await toast.promise(mutation.mutateAsync({id: recipe.id, formData: data}), {
      pending: t('common:PROCESSING'),
      success: t('UPDATE_RECIPE_SUCCESS'),
      error: t('UPDATE_RECIPE_ERROR'),
    });
  };

  return (
    <RecipeForm
      recipe={recipe}
      initialData={initialData}
      editAction={editRecipeHandler}
    />
  );
};

export default EditRecipe;
