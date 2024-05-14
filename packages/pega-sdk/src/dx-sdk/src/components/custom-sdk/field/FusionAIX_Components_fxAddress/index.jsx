import { Icon, registerIcon } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import * as location from '@pega/cosmos-react-core/lib/components/Icon/icons/location-solid.icon';
import StyledFusionAixComponentsFxAddressWrapper from './styles';
import React from 'react';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxAddress = props => {
  const { getPConnect, value, isIcon, isCity } = props;

  registerIcon(location);
  return (
    <StyledFusionAixComponentsFxAddressWrapper>
      <div className='address'>
        {isIcon && <Icon name='location-solid' />}
        {isCity ? value.split(",")[0] : value}
      </div>

    </StyledFusionAixComponentsFxAddressWrapper>
  );
};

FusionAixComponentsFxAddress.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxAddress.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxAddress;
