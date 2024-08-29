import {useState} from 'react';

const useForm = <T>(initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [dataErrors, setDataErrors] = useState<string[]>([]);

  const onChangeHandler = (name: string, value: unknown) => {
    if (!name || value === undefined) {
      console.warn('useForm :: name and value parameters are required');
      return;
    }
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    data,
    setData,
    onChangeHandler,
    dataErrors,
    setDataErrors,
  };
};

export default useForm;
