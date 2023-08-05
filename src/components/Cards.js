import * as React from "react";
import Animate from "./Animate";
import { niceNumber } from "../utils";
import { PropTypes } from "prop-types";

const Card = ({ value, digits = 2, useAnimation = true, unit = "ms" }) => {
  const [tmpVal, setTmpVal] = React.useState(0);
  const format = (value) => {
    return niceNumber(value, digits);
  };
  const onComplete = () => {
    setTmpVal(value);
  };
  return (
    <>
      <Animate
        from={tmpVal}
        to={value}
        speed={20}
        useAnimation={useAnimation}
        format={format}
        onComplete={onComplete}
      />{" "}
      {unit}
    </>
  );
};

Card.propTypes = {
  value: PropTypes.number.isRequired,
  digits: PropTypes.number,
  useAnimation: PropTypes.bool,
  unit: PropTypes.string
};

export default Card;
