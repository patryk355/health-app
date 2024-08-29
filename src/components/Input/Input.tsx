import {Input as MuiInput} from '@mui/material';

import styles from './Input.module.scss';

interface InputProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  label?: string;
  hasError?: boolean;
  errorText?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  name,
  value,
  onChange,
  label,
  hasError,
  errorText,
  type = 'text',
  required = false,
  disabled = false,
}: InputProps) => {
  return (
    <div className={styles['input-container']}>
      {typeof label === 'string' && <p className={styles.label}>{label}</p>}
      <MuiInput
        classes={{
          root: styles['root-input'],
          input: styles.input,
        }}
        name={name}
        value={value}
        type={type}
        required={required}
        disabled={disabled}
        error={hasError}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {hasError && typeof errorText === 'string' && (
        <p className={styles['error-text']}>{errorText}</p>
      )}
    </div>
  );
};

export default Input;
