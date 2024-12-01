import {FormEvent} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import Input from '../../components/Input/Input.tsx';
import useForm from '../../hooks/useForm.ts';
import {createUser} from '../../services/users.ts';
import {emailValidator} from '../../utils/validators.ts';
import {MIN_PASSWORD_LENGTH} from '../../constants/common.ts';

import styles from '../Login/Login.module.scss';

interface Data {
  email: string;
  username: string;
  password: string;
}

const initialData = {
  email: '',
  username: '',
  password: '',
};

const Register = () => {
  const {t} = useTranslation(['common', 'users']);

  const {data, onChangeHandler, dataErrors, setDataErrors} =
    useForm<Data>(initialData);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      toast
        .promise(createUser(data), {
          pending: t('PROCESSING'),
          success: t('users:CREATE_USER_SUCCESS'),
          error: t('users:CREATE_USER_ERROR'),
        })
        .then(() => {
          navigate('/login');
        });
    },
  });

  const validate = () => {
    const _errors: string[] = [];

    if (!emailValidator(data.email.trim())) {
      _errors.push('email');
    }

    if (data.username.trim().length === 0) {
      _errors.push('username');
    }

    if (data.password.length < MIN_PASSWORD_LENGTH) {
      _errors.push('password');
    }

    setDataErrors(_errors);

    return _errors.length === 0;
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    mutation.mutate();
  };

  return (
    <div className={styles['form-container']}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h2>{t('REGISTER')}</h2>
        <Input
          name='email'
          value={data.email}
          type='email'
          label={t('EMAIL')}
          hasError={dataErrors.includes('email')}
          errorText={t('INVALID_EMAIL')}
          onChange={onChangeHandler}
        />
        <Input
          name='username'
          value={data.username}
          label={t('USERNAME')}
          hasError={dataErrors.includes('username')}
          errorText={t('FIELD_REQUIRED')}
          onChange={onChangeHandler}
        />
        <Input
          name='password'
          value={data.password}
          type='password'
          label={t('PASSWORD')}
          hasError={dataErrors.includes('password')}
          errorText={t('PASSWORD_MIN_LENGTH', {
            minLength: MIN_PASSWORD_LENGTH,
          })}
          onChange={onChangeHandler}
        />
        <Button variant='text' type='submit'>
          {t('REGISTER')}
        </Button>
      </form>
    </div>
  );
};

export default Register;
