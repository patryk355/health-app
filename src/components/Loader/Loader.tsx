import {CircularProgress} from '@mui/material';

const Loader = () => {
  return (
    <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <svg width={0} height={0}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#ff5722' />
            <stop offset='100%' stopColor='#d32f2f' />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{'svg circle': {stroke: 'url(#gradient)'}}} />
    </div>
  );
};

export default Loader;
