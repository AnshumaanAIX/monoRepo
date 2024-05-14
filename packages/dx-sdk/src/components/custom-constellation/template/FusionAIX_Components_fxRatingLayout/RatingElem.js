import { useState, useMemo } from 'react';
import { Slider } from '@pega/cosmos-react-core';

const tickValues = ['N/A', 'Low', 'Medium', 'High', 'Severe'];
const RatingElem = (props) => {
  const { getPConnect, label, value, path, propIndex } = props;
  const [inputValue, setInputValue] = useState(value);
  const ticksObject = {};
  const numTicks = 5;

  Array(numTicks)
    .fill(0)
    .map((_, index) => index)
    .forEach((tick) => {
      ticksObject[tick + 1] = tickValues[tick];
    });

  /* When calling updateFieldValue, we need to be in the context of the object in the array
     Using useMemo to cache the actionsApi object to only create it once and not when changing tabs
     path should be set to the embedded object name like '.Ratings' */
  const actionsApi = useMemo(() => {
    const messageConfig = {
      meta: props,
      options: {
        context: getPConnect().getContextName(),
        pageReference: `caseInfo.content${path}[${propIndex}]`,
        target: getPConnect().getTarget()
      }
    };
    const c11nEnv = (window).PCore.createPConnect(messageConfig);
    return c11nEnv.getPConnect().getActionsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPConnect]);

  const onChangeValue = (changeValue) => {
    setInputValue(changeValue);
    actionsApi?.updateFieldValue('.Value', changeValue);
  };

  return (
    <Slider
      step={1}
      min={1}
      max={5}
      ticks={ticksObject}
      showInput={false}
      label={label}
      value={inputValue}
      onChange={onChangeValue}
    />
  );
};
export default RatingElem;
