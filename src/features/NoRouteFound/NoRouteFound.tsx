import {Link} from 'react-router-dom';
import i18n from '../../i18n.ts';

import styles from './NoRouteFound.module.scss';

const NoRouteFound = (
  <div className={styles.container}>
    <p>{i18n.t('CANNOT_FIND_ROUTE')}</p>
    <Link to='/products'>{i18n.t('BACK_TO_HOMEPAGE')}</Link>
  </div>
);

export default NoRouteFound;
