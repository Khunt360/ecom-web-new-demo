import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const ProgressBarExample = ({setRangeValue,rangeValue,minValue,maxValue}) => {

  const handleChangeRange = (values) => {
    setRangeValue(values);
  };
  return (
    <div className="mt-3 price-progressbar">
      <div className="plpg-range mt-3">
        <Slider
          range
          step={1}
          min={minValue}
          max={maxValue}
          value={rangeValue}
          onChange={handleChangeRange}
        />
        <p className="prod-range-val">
          Rs. {rangeValue[0]} - Rs. {rangeValue[1]}
        </p>
      </div>
    </div>
  );
};


export default ProgressBarExample;
