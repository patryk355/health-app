import {useEffect} from 'react';
import {useUserStore} from '../../store/userStore.ts';

const Logout = () => {
  const setIsLogged = useUserStore((state) => state.setIsLogged);

  useEffect(() => {
    setIsLogged(false);
  }, [setIsLogged]);

  return <></>;
};

export default Logout;
