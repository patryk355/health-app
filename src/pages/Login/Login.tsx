import {FormEvent} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';

import Input from '../../components/Input/Input.tsx';
import useForm from '../../hooks/useForm.ts';
import {emailValidator} from '../../utils/validators.ts';
import {MIN_PASSWORD_LENGTH} from '../../constants/common.ts';

import styles from './Login.module.scss';
import {Link} from 'react-router-dom';

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

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // TODO: send request to server
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
