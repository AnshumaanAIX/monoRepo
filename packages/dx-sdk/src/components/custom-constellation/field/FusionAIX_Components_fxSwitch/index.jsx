import { useState } from 'react';
import { Switch } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxSwitchWrapper from './styles';

const FusionAixComponentsFxSwitch = props => {
  const { getPConnect, value, label } = props;

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

FusionAixComponentsFxSwitch.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.bool,
  caption: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  additionalProps: PropTypes.objectOf(PropTypes.any),
  displayMode: PropTypes.string,
  variant: PropTypes.string,
  displayValue: PropTypes.string,
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string
};

export default FusionAixComponentsFxSwitch;
