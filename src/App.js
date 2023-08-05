import './styles.css';
import * as React from 'react';
import moment from 'moment';
import { generate, getTickerArray } from './utils';
import Card from './components/Cards';
import Refresh from './components/Refresh';
async function gettimeseries() {
  return {};
}

function RenderDate({ tickers }) {
  React.useEffect(() => {
    gettimeseries();
  }, []);
  return (
    <>
      {(tickers || []).length > 0 && (
        <>
          {' '}
          <br /> {tickers[0]} - {tickers[tickers.length - 1]}
        </>
      )}
    </>
  );
}

export default function App() {
  const bucketSize = 3;
  const [tickers, setTickers] = React.useState(
    getTickerArray(moment().startOf('day'), moment(), bucketSize),
  );

  const [cardValue, setCardValue] = React.useState(generate());

  const onChange = (time) => {
    setTickers(
      getTickerArray(moment().startOf('day'), moment(time), bucketSize),
    );
    setCardValue(generate());
  };

  return (
    <div>
      <Refresh rate={bucketSize * 1000} onChange={onChange} />
      {moment('2023-08-05T03:37:04+05:30').diff(
        '2023-08-04T03:36:16+05:30',
        'hours',
      )}
      <RenderDate tickers={tickers} />
      <br />

      <br />

      <Card value={cardValue} />
    </div>
  );
}
