import moment from 'moment';
export function generate() {
  return Math.ceil(Math.random() * 1000000);
}

export function niceNumber(val, precision) {
  let result = niceNumberRaw(val, precision);
  return `${result.value}${result.unit}`;
}

export function round(num, decimalPlaces = 0) {
  num = Math.round(num + 'e' + decimalPlaces);
  return Number(num + 'e' + -decimalPlaces);
}

export function getTickerArray(start, end, size) {
  let tickers = [];
  while (moment(end).diff(moment(start), 'minutes') > 0) {
    tickers.push(start.format());
    start.add(size, 'minutes');
  }
  return tickers;
}

export function niceNumberRaw(val, precision) {
  if (isNaN(val)) {
    let tempVal = Number(val);
    return { value: isNaN(tempVal) ? val : tempVal, unit: '' };
  }

  let precisionFactor = precision ? Math.pow(10, precision) : 10;

  if (Math.abs(val) >= 1000000000000) {
    return {
      value:
        Math.round((Math.round(val) / 1000000000000) * precisionFactor) /
        precisionFactor,
      unit: 'T',
    };
  } else if (Math.abs(val) >= 1000000000) {
    return {
      value:
        Math.round((Math.round(val) / 1000000000) * precisionFactor) /
        precisionFactor,
      unit: 'B',
    };
  } else if (Math.abs(val) >= 1000000) {
    return {
      value:
        Math.round((Math.round(val) / 1000000) * precisionFactor) /
        precisionFactor,
      unit: 'M',
    };
  } else if (Math.abs(val) >= 1000) {
    return {
      value:
        Math.round((Math.round(val) / 1000) * precisionFactor) /
        precisionFactor,
      unit: 'K',
    };
  }

  // Should not round numbers below 1000. Values should be shown rounded to 2 decimal places if the value is not an integer.
  let roundVal = Math.round(val * precisionFactor) / precisionFactor;
  return { value: roundVal.toString(), unit: '' };
}
