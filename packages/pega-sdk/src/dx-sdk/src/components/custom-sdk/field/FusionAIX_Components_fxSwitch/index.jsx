import React, { useState } from 'react';
import { Switch } from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxSwitchWrapper from './styles';

const FusionAixComponentsFxSwitch = props => {
  const { label } = props;

  const [on, setOn] = useState(false);

  return (
    <StyledFusionAixComponentsFxSwitchWrapper>
      <Switch
        id='switch'
        on={on}
        onChange={() => setOn(curr => !curr)}
        label={label}
        disabled={false}
      />
    </StyledFusionAixComponentsFxSwitchWrapper>
  );
};

FusionAixComponentsFxSwitch.defaultProps = {
  validatemessage: '',
  value: false,
  label: '',
  hideLabel: false,
  helperText: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  additionalProps: {},
  displayMode: null,
  variant: 'inline',
  displayValue: 'Yes/No',
  trueLabel: '',
  falseLabel: ''
};

export default FusionAixComponentsFxSwitch;
