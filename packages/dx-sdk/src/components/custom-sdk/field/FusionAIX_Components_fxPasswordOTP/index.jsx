import PropTypes from 'prop-types';
import { Input, Label } from '@pega/cosmos-react-core';
import React, { useEffect, useState, useRef } from 'react';
import OTPInput from 'react-otp-input';

import StyledFusionAixComponentsFxPasswordOtpWrapper from './styles';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxPasswordOtp = props => {
  const { getPConnect, value, placeholder, disabled, readOnly, required, label, testId,
    fieldType,
    otpLength
  } = props;

  console.log('otpLength', otpLength, 'Props', props);
  const [otp, setOtp] = useState('');

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.value;
  // console.log(fieldType, 'fieldType', otpLength);

  const handleOnChange = event => {
    const { value: updatedValue } = event.target;
    actions.updateFieldValue(propName, updatedValue);
  };

  console.log('fieldType:', fieldType, "otpLength:", otpLength, "value:", value, "Otp", otp);

  if (fieldType === 'none') {
    return <h1>Please Select FieldType</h1>;
  }

  return (
    <StyledFusionAixComponentsFxPasswordOtpWrapper>
      {fieldType === 'Password' ? <Input
        type='Password'
        label={fieldType}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={handleOnChange}
        testId={testId}
      /> : <div className='otpDiv'

      ><Label className='otpLabel' >Please Enter {fieldType}</Label><OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={otpLength}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props}
            style={{
              width: '30px',
              height: '30px',
              border: '1px solid gray',
              borderRadius: '5px',
              margin: '5px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          />}
        /></div>}

    </StyledFusionAixComponentsFxPasswordOtpWrapper>
  );
};

FusionAixComponentsFxPasswordOtp.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxPasswordOtp.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxPasswordOtp;
