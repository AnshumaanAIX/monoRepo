import React from 'react';
import {
  Button,
  registerIcon,
  Icon
} from "@pega/cosmos-react-core";
import PropTypes from "prop-types";
import * as information from '@pega/cosmos-react-core/lib/components/Icon/icons/information-solid.icon';

import StyledFusionAixComponentsFxBooleanTabWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxBooleanTab = props => {
  const { getPConnect } = props;
  console.log(props);
  registerIcon(information);
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;
  console.log(propName);
  const handleClick = (evt) => {
    console.log(evt?.target?.innerText);
    if (evt?.target?.innerText === "Personal") {
      actions.updateFieldValue(propName, false);
      getPConnect().setValue(propName, false);
      actions.triggerFieldChange(`pyPortal${propName}`, false);
    } else {
      actions.updateFieldValue(propName, true);
      getPConnect().setValue(propName, true);
      actions.triggerFieldChange(`pyPortal${propName}`, true);
    }

  };

  return (
    <StyledFusionAixComponentsFxBooleanTabWrapper>
      <div className="card">
        <ul className="tabs">
          <li className="tab active">  <Icon name='information-solid' />  <Button variant='text' onClick={handleClick} >
            Personal
          </Button></li>
          <li className="tab"><Icon name='information-solid' />  <Button variant='text' onClick={handleClick} >
            Employment
          </Button></li>
        </ul>
      </div>
    </StyledFusionAixComponentsFxBooleanTabWrapper>
  );


};


FusionAixComponentsFxBooleanTab.defaultProps = {
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

FusionAixComponentsFxBooleanTab.propTypes = {
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

export default FusionAixComponentsFxBooleanTab;
