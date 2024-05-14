import PropTypes from 'prop-types';
import { useState } from 'react';

import { Slider } from '@pega/cosmos-react-core';

import StyledFusionAixComponentsFxSliderWrapper from './styles';

const FusionAixComponentsFxSlider = props => {
  const {
    getPConnect,
    defaultvalue,
    disabled,
    readOnly,
    required,
    label,
    testId,
    helper,
    max,
    min,
    step,
    preview,
    status,
    orientation,
    hidden,
    input,
    progress,
    ticks
  } = props;

  const [value, setValue] = useState(defaultvalue || 0);
  let ticksObject = ticks;
  if (max > min && !ticksObject) {
    ticksObject = {};
    const numTicks = Math.floor((max - min) / (step || 1)) + 1;
    Array(numTicks)
      .fill(0)
      .map((_, index) => min + index * step)
      .forEach(tick => {
        ticksObject[tick] = tick.toString();
      });
  }
  if (status === 'none') {
    return <h1>Please select something else except none to Status</h1>;
  }

  return (
    <StyledFusionAixComponentsFxSliderWrapper>

      <Slider
        orientation={orientation}
        step={step}
        min={min}
        max={max}
        ticks={ticksObject}
        showProgress={progress}
        preview={preview}
        showInput={input}
        label={label}
        labelHidden={hidden}
        info={helper}
        status={status}
        required={false}
        disabled={false}
        readOnly={false}
        value={value}
        onChange={changeValue => setValue(changeValue)}
      />

    </StyledFusionAixComponentsFxSliderWrapper>
  );
};

FusionAixComponentsFxSlider.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxSlider.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxSlider;
