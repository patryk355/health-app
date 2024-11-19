import {useTranslation} from 'react-i18next';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

import {useMineralStore} from '../../store/mineralStore.ts';
import {Product} from '../../types/product.ts';

import styles from '../../pages/Product/Product.module.scss';

interface Props {
  product: Product;
}

const MineralTable = ({product}: Props) => {
  const {t} = useTranslation('minerals');

  const minerals = useMineralStore((state) => state.minerals);

  const productMinerals = product?.minerals
    ?.map((item) => {
      const mineral = minerals.find(
        (mineral) => mineral.id === item.mineral_id,
      );
      if (!mineral) {
        console.warn(`Mineral not found for id=${item.mineral_id}`);
        return null;
      }
      return {
        ...mineral,
        amount: item.amount,
      };
    })
    .filter((item) => item !== null);

  if (!productMinerals) {
    return null;
  }

  return (
    <div>
      <h2>{t('MINERALS')}</h2>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableBody>
            {productMinerals.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component='th' scope='row'>
                  {t(`${row.name}`)} ({row.unit})
                </TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MineralTable;
