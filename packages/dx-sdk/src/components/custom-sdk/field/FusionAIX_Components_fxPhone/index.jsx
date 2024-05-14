import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Icon, registerIcon } from '@pega/cosmos-react-core';
import * as phone from '@pega/cosmos-react-core/lib/components/Icon/icons/phone-solid.icon';

import StyledFusionAixComponentsFxPhoneWrapper from './styles';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxPhone = props => {
  const {
    getPConnect,
    value,
    isIcon
  } = props;
  registerIcon(phone);

  return (
    <StyledFusionAixComponentsFxPhoneWrapper>
      {isIcon && <Icon name='phone-solid' />}&nbsp;&nbsp;
      {value}
    </StyledFusionAixComponentsFxPhoneWrapper>
  );
};

FusionAixComponentsFxPhone.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  datasource: undefined,
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  showCountryCode: true,
  testId: null,
  displayMode: null,
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};

FusionAixComponentsFxPhone.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  datasource: PropTypes.node,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
  showCountryCode: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  displayMode: PropTypes.string,
  additionalProps: PropTypes.objectOf(PropTypes.any),
  variant: PropTypes.string,
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  hasSuggestions: PropTypes.bool
};

export default FusionAixComponentsFxPhone;
