import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../utils/logout.ts';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [navigate]);

  return <></>;
};

export default Logout;
