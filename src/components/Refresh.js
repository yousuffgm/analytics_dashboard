import * as React from 'react';
import { PropTypes } from 'prop-types';

import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const Refresh = ({ rate, onChange }) => {
  const [time, setTime] = React.useState(moment().format());
  const [counter, setCounter] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress((counter / rate) * 100);
  }, [counter]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCounter((counter) => {
        if (counter + 1 > rate) {
          return 1;
        }
        return counter + 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [rate]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format());
      setCounter(rate);
      onChange && onChange(time);
    }, rate * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [rate, onChange]);

  return (
    <>
      <CircularProgressWithLabel value={progress} />
    </>
  );
};
Refresh.protoType = {
  rate: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
export default Refresh;
