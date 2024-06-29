import {CircularProgress} from '@mui/material';

const Loader = () => {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#E01CD5' />
            <stop offset='100%' stopColor='#1CB5E0' />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{'svg circle': {stroke: 'url(#gradient)'}}} />
    </>
  );
};

export default Loader;
