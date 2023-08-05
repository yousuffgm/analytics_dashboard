import './styles.css';
import * as React from 'react';
import moment from 'moment';
import { generate } from './utils';
import KpiCard from './components/KpiCard';
import Refresh from './components/Refresh';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function App() {
  const bucketSize = 15;
  const [time, setTime] = React.useState(moment().format());
  const [cardValue, setCardValue] = React.useState(generate());
  const onChange = (time) => {
    setTime(time);
    setCardValue(generate());
  };

  return (
    <div>
      {time}
      <br />
      <Refresh rate={bucketSize} onChange={onChange} />
      <br />
      <KpiCard
        value={cardValue}
        title="Content View"
        icon={<AccessAlarmIcon />}
      />
    </div>
  );
}
