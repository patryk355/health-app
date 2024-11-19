import {useTranslation} from 'react-i18next';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

import {useGoodnessStore} from '../../store/goodnessStore.ts';
import {Product} from '../../types/product.ts';

import styles from '../../pages/Product/Product.module.scss';

interface Props {
  product: Product;
}

const GoodnessTable = ({product}: Props) => {
  const {t} = useTranslation('goodness');

  const goodness = useGoodnessStore((state) => state.goodness);

  const productGoodness = product?.goodness
    ?.map((item) => {
      const foundGoodness = goodness.find((g) => g.id === item.goodness_id);
      if (!foundGoodness) {
        console.warn(`Goodness not found for id=${item.goodness_id}`);
        return null;
      }
      return {
        ...foundGoodness,
        amount: item.amount,
      };
    })
    .filter((item) => item !== null);

  if (!productGoodness) {
    return null;
  }

  return (
    <div>
      <h2>{t('GOODNESS')}</h2>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableBody>
            {productGoodness.map((row) => (
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

export default GoodnessTable;
