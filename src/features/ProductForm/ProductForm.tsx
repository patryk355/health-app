import {FormEvent} from 'react';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {Button, FormControl, InputLabel, Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {useQuery} from '@tanstack/react-query';

import useForm from '../../hooks/useForm.ts';
import {getCategories} from '../../services/categories.ts';
import Input from '../../components/Input/Input.tsx';
import {imageValidator} from '../../utils/validators.ts';
import {PlusCircleIcon} from '../../assets/icons/PlusIcon.tsx';
import {InfoIcon} from '../../assets/icons/InfoIcon.tsx';
import {DeleteIcon} from '../../assets/icons/DeleteIcon.tsx';
import {
  CreateProductData,
  Product,
  ProductFormData,
} from '../../types/product.ts';

import styles from '../RecipeForm/RecipeForm.module.scss';

type Field = 'advantages' | 'disadvantages' | 'contraindications' | 'images';

const initialCreateProductData = {
  name: '',
  description: '',
  advantages: [''],
  disadvantages: [''],
  contraindications: [''],
  images: [''],
  category_id: '',
  minerals: [],
  goodness: [],
};

interface Props {
  product?: Product;
  initialData?: ProductFormData;
  createAction?: (data: CreateProductData) => void;
  editAction?: (data: ProductFormData) => void;
}

const ProductForm = ({
  product,
  initialData,
  createAction,
  editAction,
}: Props) => {
  const {t} = useTranslation(['products', 'common']);

  const {data: categories, isPending: isCategoriesPending} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {data, setData, onChangeHandler} = useForm<ProductFormData>(
    initialData ? initialData : initialCreateProductData,
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
      console.error('ProductForm :: validateImages', error);
      return false;
    }
  };

  const validate = async (formData: ProductFormData) => {
    const {name, description, images, category_id} = formData;
    if (name.trim().length === 0) {
      toast.error(t('PRODUCT_NAME_REQUIRED'));
      return false;
    }
    if (description.trim().length === 0) {
      toast.error(t('PRODUCT_DESCRIPTION_REQUIRED'));
      return false;
    }
    if (category_id === '') {
      toast.error(t('PRODUCT_CATEGORY_REQUIRED'));
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
    console.debug('ProductForm :: submitHandler', _data);
    const isValid = await validate(_data);
    if (!isValid) {
      return;
    }
    const preparedData: CreateProductData = {
      ...data,
      advantages: data.advantages.join('; '),
      disadvantages: data.disadvantages.join('; '),
      contraindications: data.contraindications.join('; '),
    };

    if (product) {
      // editAction && editAction(preparedData);
    } else {
      createAction && createAction(preparedData);
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
            <p>{t('ADVANTAGES')}</p>
            <span
              className={styles.addIcon}
              onClick={() => addEmptyStringToArray('advantages')}
            >
              <PlusCircleIcon />
            </span>
          </span>
          {data.advantages.map((item, index) => {
            return (
              <div key={`advantage-${index}`} className={styles.inputContainer}>
                <Input
                  name={item}
                  value={data.advantages[index]}
                  onChange={(_, value) => {
                    updateArrayOfString('advantages', value, index);
                  }}
                />
                {index !== 0 && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() => deleteItemFromArray('advantages', index)}
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
            <p>{t('DISADVANTAGES')}</p>
            <span
              className={styles.addIcon}
              onClick={() => addEmptyStringToArray('disadvantages')}
            >
              <PlusCircleIcon />
            </span>
          </span>
          {data.disadvantages.map((item, index) => {
            return (
              <div
                key={`disadvantage-${index}`}
                className={styles.inputContainer}
              >
                <Input
                  name={item}
                  value={data.disadvantages[index]}
                  onChange={(_, value) => {
                    updateArrayOfString('disadvantages', value, index);
                  }}
                />
                {index !== 0 && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() => deleteItemFromArray('disadvantages', index)}
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
            <p>{t('CONTRAINDICATIONS')}</p>
            <span
              className={styles.addIcon}
              onClick={() => addEmptyStringToArray('contraindications')}
            >
              <PlusCircleIcon />
            </span>
          </span>
          {data.contraindications.map((item, index) => {
            return (
              <div
                key={`contraindication-${index}`}
                className={styles.inputContainer}
              >
                <Input
                  name={item}
                  value={data.contraindications[index]}
                  onChange={(_, value) => {
                    updateArrayOfString('contraindications', value, index);
                  }}
                />
                {index !== 0 && (
                  <span
                    className={styles.deleteIcon}
                    onClick={() =>
                      deleteItemFromArray('contraindications', index)
                    }
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
        {categories && !isCategoriesPending && (
          <FormControl fullWidth>
            <InputLabel id='product-category-label'>
              {t('PRODUCT_CATEGORY')}
            </InputLabel>
            <Select
              labelId='product-category-label'
              id='product-category-select'
              value={data.category_id}
              label={t('PRODUCT_CATEGORY')}
              onChange={(e) => onChangeHandler('category_id', e.target.value)}
            >
              {categories?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {t(`CATEGORY_${item.name}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button variant='contained' type='submit'>
          {t('common:SAVE')}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
