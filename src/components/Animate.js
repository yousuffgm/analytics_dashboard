import { PropTypes } from 'prop-types';
import * as React from 'react';
const Animate = ({
  from,
  to,
  speed = 20,
  useAnimation = true,
  format = (value) => value,
  onComplete = () => false,
}) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (value === to) {
      onComplete();
    }
  }, [value, to, onComplete]);

  React.useEffect(() => {
    if (from === to) {
      return;
    }
    if (!useAnimation) {
      setValue(to);
    }
    const interval = Math.ceil((to - from) / speed, 2);
    const timer = setInterval(() => {
      setValue((v) => {
        const newValue = v + interval;
        if (
          (interval < 0 && to - newValue >= 0) ||
          (interval > 0 && to - newValue <= 0)
        ) {
          clearInterval(this);
          return to;
        } else {
          return newValue;
        }
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [from, to, speed, useAnimation]);
  return <> {format(value)} </>;
};
Animate.protoType = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  speed: PropTypes.number,
  useAnimation: PropTypes.bool,
  format: PropTypes.func,
  onComplete: PropTypes.func,
};
export default Animate;
