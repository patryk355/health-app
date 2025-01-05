import {FormEvent} from 'react';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {Button, Checkbox, FormControlLabel, FormGroup} from '@mui/material';

import useForm from '../../hooks/useForm.ts';
import Input from '../../components/Input/Input.tsx';
import {imageValidator} from '../../utils/validators.ts';
import {PlusCircleIcon} from '../../assets/icons/PlusIcon.tsx';
import {InfoIcon} from '../../assets/icons/InfoIcon.tsx';
import {DeleteIcon} from '../../assets/icons/DeleteIcon.tsx';
import {RecipeFormData, Recipe} from '../../types/recipe.ts';

import styles from './RecipeForm.module.scss';

type Field = 'ingredients' | 'steps' | 'images';

const initialCreateRecipeData = {
  name: '',
  description: '',
  ingredients: [''],
  steps: [''],
  images: [''],
  products: [],
};

interface Props {
  recipe?: Recipe;
  initialData?: RecipeFormData;
  createAction?: (data: RecipeFormData) => void;
  editAction?: (data: RecipeFormData) => void;
}

const RecipeForm = ({recipe, initialData, createAction, editAction}: Props) => {
  const {t} = useTranslation(['recipes', 'common']);

  const {data, setData, onChangeHandler} = useForm<RecipeFormData>(
    initialData ? initialData : initialCreateRecipeData,
  );

  const validateImages = async (images: string[]) => {
    try {
      const validationResults = await Promise.all(
        images.map(async (item) => {
          const isImageValid = await imageValidator(item);
          if (!isImageValid) {
            toast.error(t('common:WRONG_IMAGE_URL', {url: item}));
            return false;
          }
          return true;
        }),
      );
      return !validationResults.includes(false);
    } catch (error) {
      console.error('RecipeForm :: validateImages', error);
      return false;
    }
  };

  const validate = async (formData: RecipeFormData) => {
    const {name, ingredients, steps, images} = formData;
    if (name.trim().length === 0) {
      toast.error(t('RECIPE_NAME_REQUIRED'));
      return false;
    }
    if (ingredients.length === 0) {
      toast.error(t('INGREDIENTS_REQUIRED'));
      return false;
    }
    if (ingredients.some((item) => item.trim().length === 0)) {
      toast.error(t('INGREDIENT_CANNOT_BE_EMPTY'));
      return false;
    }
    if (steps.length === 0) {
      toast.error(t('STEPS_REQUIRED'));
      return false;
    }
    if (steps.some((item) => item.trim().length === 0)) {
      toast.error(t('STEP_CANNOT_BE_EMPTY'));
      return false;
    }
    if (images.length > 0) {
      const isValid = await validateImages(images);
      if (!isValid) {
        return false;
      }
    }
    return true;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const _data = {...data};
    if (data.images.length > 0) {
      _data.images = data.images.filter((item) => item.trim().length > 0);
    }
    console.debug('RecipeForm :: submitHandler', _data);
    const isValid = await validate(_data);
    if (!isValid) {
      return;
    }
    if (recipe) {
      editAction && editAction(_data);
    } else {
      createAction && createAction(_data);
    }
  };

  const updateArrayOfString = (field: Field, value: string, index: number) => {
    setData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const addEmptyStringToArray = (field: Field) => {
    setData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const deleteItemFromArray = (field: Field, index: number) => {
    setData((prev) => {
      const filteredArray = [...prev[field]].filter((_, i) => i !== index);
      return {
        ...prev,
        [field]: filteredArray,
      };
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <Input
          name='name'
          label={t('common:NAME')}
          value={data.name}
          onChange={onChangeHandler}
        />
        <Input
          name='description'
          label={t('common:DESCRIPTION')}
          value={data.description}
          onChange={onChangeHandler}
        />
        <div className={styles.itemsContainer}>
          <span>
            <p>{t('INGREDIENTS')}</p>
            <span
              className={styles.addIcon}
              onClick={() => addEmptyStringToArray('ingredients')}
            >
              <PlusCircleIcon />
            </span>
          </span>
          <span className={styles.infoContainer}>
            <span>
              <InfoIcon />
            </span>
            <p>{t('INGREDIENTS_INFO')}</p>
          </span>
          {data.ingredients.map((item, index) => {
            return (
              <div
                key={`ingredient-${index}`}
                className={styles.inputContainer}
              >
                <Input
                  name={item}
                  value={data.ingredients[index]}
                  onChange={(_, value) => {
                    updateArrayOfString('ingredients', value, index);
                  }}
                />
                {index !== 0 && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() => deleteItemFromArray('ingredients', index)}
                  >
                    <DeleteIcon />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.itemsContainer}>
          <span>
            <p>{t('INSTRUCTION')}</p>
            <span
              className={styles.addIcon}
              onClick={() => addEmptyStringToArray('steps')}
            >
              <PlusCircleIcon />
            </span>
          </span>
          <span className={styles.infoContainer}>
            <span>
              <InfoIcon />
            </span>
            <p>{t('STEPS_INFO')}</p>
          </span>
          {data.steps.map((item, index) => {
            return (
              <div key={`step-${index}`} className={styles.inputContainer}>
                <Input
                  name={item}
                  value={data.steps[index]}
                  onChange={(_, value) => {
                    updateArrayOfString('steps', value, index);
                  }}
                />
                {index !== 0 && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() => deleteItemFromArray('steps', index)}
                  >
                    <DeleteIcon />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.itemsContainer}>
          <span>
            <p>{t('common:IMAGES')}</p>
            <span
              className={styles.addIcon}
              onClick={() => addEmptyStringToArray('images')}
            >
              <PlusCircleIcon />
            </span>
          </span>
          <span className={styles.infoContainer}>
            <span>
              <InfoIcon />
            </span>
            <p>{t('IMAGES_INFO')}</p>
          </span>
          {data.images.map((item, index) => {
            return (
              <div key={`image-${index}`} className={styles.inputContainer}>
                <Input
                  name={item}
                  value={data.images[index]}
                  onChange={(_, value) => {
                    updateArrayOfString('images', value, index);
                  }}
                />
                {index !== 0 && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() => deleteItemFromArray('images', index)}
                  >
                    <DeleteIcon />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {recipe && (
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={initialData?.active || false}
                    value={data.active}
                    onChange={(e) =>
                      onChangeHandler('active', e.target.checked)
                    }
                  />
                }
                label={t('common:ACTIVE')}
              />
            </FormGroup>
            {data.active && (
              <span className={styles.infoContainer}>
                <span>
                  <InfoIcon />
                </span>
                <p>{t('ACTIVE_INFO')}</p>
              </span>
            )}
          </div>
        )}
        <Button variant='contained' type='submit'>
          {t('common:SAVE')}
        </Button>
      </form>
    </div>
  );
};

export default RecipeForm;
