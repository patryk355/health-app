import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@tanstack/react-query';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import Loader from '../../components/Loader/Loader.tsx';
import DeleteUser from '../../features/DeleteUser/DeleteUser.tsx';
import {DeleteIcon} from '../../assets/icons/DeleteIcon.tsx';
import {getUsers} from '../../services/users.ts';
import {useUserStore} from '../../store/userStore.ts';
import {User} from '../../types/user.ts';

import styles from './Users.module.scss';

const Users = () => {
  const {t} = useTranslation(['users', 'common']);

  const {user} = useUserStore();

  const {data, isPending} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  if (isPending) return <Loader />;

  return (
    <>
      <div className={styles.users}>
        <h1>{t('common:USERS')}</h1>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('common:USERNAME')}</TableCell>
                <TableCell>{t('common:EMAIL')}</TableCell>
                <TableCell>{t('ROLE')}</TableCell>
                <TableCell>{t('common:DELETE')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component='th' scope='row'>
                    {row.username}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.email}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {t(row.role)}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {user && user.id !== row.id && (
                      <span
                        className={styles.delete}
                        onClick={() => setSelectedUser(row)}
                      >
                        <DeleteIcon />
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {selectedUser && (
        <DeleteUser user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};

export default Users;
