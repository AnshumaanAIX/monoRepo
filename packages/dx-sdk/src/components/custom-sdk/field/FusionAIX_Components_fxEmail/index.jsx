import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Icon, registerIcon } from '@pega/cosmos-react-core';
import * as mail from '@pega/cosmos-react-core/lib/components/Icon/icons/mail.icon';


import handleEvent from "./event-utils";

import StyledFusionAixComponentsFxEmailWrapper from './styles';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxEmail = props => {
  const {
    getPConnect,
    value,
    isIcon,
  } = props;
  registerIcon(mail);

  return (
    <StyledFusionAixComponentsFxEmailWrapper>
      {isIcon && <Icon name='mail' />}&nbsp;&nbsp;
      {value}
    </StyledFusionAixComponentsFxEmailWrapper>
  );
};

FusionAixComponentsFxEmail.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  displayMode: null,
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};

FusionAixComponentsFxEmail.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
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

export default FusionAixComponentsFxEmail;
