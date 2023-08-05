import * as React from 'react';
import moment from 'moment';

export default function Refresh({ rate, onChange }) {
  const [time, setTime] = React.useState(moment().format());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format());
      onChange && onChange(time);
    }, rate);
    return () => {
      clearInterval(timer);
    };
  });

  return <div> {time} </div>;
}
