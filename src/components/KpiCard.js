import Animate from './Animate';
import { niceNumber } from '../utils';
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';

const KpiCard = ({
  value,
  title,
  icon,
  digits = 2,
  useAnimation = true,
  unit = 'ms',
}) => {
  const [tmpVal, setTmpVal] = React.useState(0);
  const format = (value) => {
    return niceNumber(value, digits);
  };
  const onComplete = () => {
    setTmpVal(value);
  };
  return (
    <Card sx={{ minWidth: 150 }}>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          backgroundColor: 'rgb(59 130 246 / 0.05)',
        }}
      >
        <Box>{icon && icon} </Box>
        <Box sx={{ pl: 1, pt: 0.3 }}>{title}</Box>
      </Box>
      <CardContent>
        <Box sx={{ textAlign: 'center', fontSize: 26, fontStyle: 'bold' }}>
          <Animate
            from={tmpVal}
            to={value}
            speed={20}
            useAnimation={useAnimation}
            format={format}
            onComplete={onComplete}
          />{' '}
          {unit}
        </Box>
      </CardContent>
    </Card>
  );
};

Card.propTypes = {
  value: PropTypes.number.isRequired,
  icon: PropTypes.element,
  digits: PropTypes.number,
  useAnimation: PropTypes.bool,
  unit: PropTypes.string,
};

export default KpiCard;
