import {useTranslation} from 'react-i18next';
import {useUserStore} from '../../store/userStore.ts';

import styles from './Profile.module.scss';

const Profile = () => {
  const {t} = useTranslation(['users', 'common']);

  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.container}>
      <dl>
        <dt>{t('common:USERNAME')}</dt>
        <dd>{user?.username}</dd>
      </dl>
      <dl>
        <dt>{t('common:EMAIL')}</dt>
        <dd>{user?.email}</dd>
      </dl>
      <dl>
        <dt>{t('ROLE')}</dt>
        <dd>{user?.role ? t(user.role) : t('UNKNOWN')}</dd>
      </dl>
    </div>
  );
};

export default Profile;
