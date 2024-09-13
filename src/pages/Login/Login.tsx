import {FormEvent} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import Input from '../../components/Input/Input.tsx';
import useForm from '../../hooks/useForm.ts';
import {useUserStore} from '../../store/userStore.ts';
import {emailValidator} from '../../utils/validators.ts';
import {MIN_PASSWORD_LENGTH} from '../../constants/common.ts';

import styles from './Login.module.scss';

interface Data {
  email: string;
  password: string;
}

const initialData = {
  email: '',
  password: '',
};

const Login = () => {
  const {t} = useTranslation();

  const {data, onChangeHandler, dataErrors, setDataErrors} =
    useForm<Data>(initialData);

  const navigate = useNavigate();

  const {setToken, setUser, setIsLogged} = useUserStore();

  const validate = () => {
    const _errors: string[] = [];

    if (!emailValidator(data.email.trim())) {
      _errors.push('email');
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth`,
        data,
      );
      console.debug('Login :: onSubmitHandler', response.data);
      setToken(response.data.token);
      setUser({
        id: response.data.id,
        email: response.data.email,
        username: response.data.username,
        role: response.data.role,
      });
      setIsLogged(true);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      // TODO: show error message in UI
      console.error('Login :: onSubmitHandler', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h2>{t('LOGGING')}</h2>
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
          {t('LOGIN')}
        </Button>
        <Link to='/register'>{t('CREATE_ACCOUNT')}</Link>
      </form>
    </div>
  );
};

export default Login;
