import React from 'react';
import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxCheaderWrapper from './styles';
import { Text } from '@pega/cosmos-react-core';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxCheader = props => {
  const { getPConnect, Paratext, value, HeadingText, variant, isStar } = props;
  let newVal;
  if (HeadingText == true) {
    newVal = Paratext;
  } else {
    newVal = value;
  }
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return (
        <Text variant={variant} readOnly={true}>
          {isStar ? <>&nbsp; * &nbsp; {newVal}</> : newVal}
        </Text>
      );
    case 'paragraph':
    default:
      return (
        <Text variant='primary' readOnly={true}>
          {isStar ? <>&nbsp; * &nbsp; {newVal}</> : newVal}
        </Text>
      );
  }
};

FusionAixComponentsFxCheader.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxCheader.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxCheader;
