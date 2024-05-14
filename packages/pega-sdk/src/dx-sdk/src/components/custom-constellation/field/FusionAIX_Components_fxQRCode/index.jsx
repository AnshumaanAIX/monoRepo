
import PropTypes from 'prop-types';
import { Flex, FormControl, FormField, QRCode } from '@pega/cosmos-react-core';
import { useEffect, useState } from 'react';

import StyledFusionAixComponentsFxQrCodeWrapper from './styles';

const FusionAixComponentsFxQrCode = props => {

  const {
    inputProperty,
    label,
    value,
    validatemessage,
    hideLabel = false,
    readOnly,
    helperText,
    testId,
    getPConnect
  } = props;
  const pConn = getPConnect();
  const [outputValue, setOutputValue] = useState(value);
  const [info, setInfo] = useState(validatemessage || helperText);
  const [status, setStatus] = useState();

  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;

  useEffect(() => {
    if (!readOnly) {
      if (validatemessage !== '') {
        setStatus('error');
      }
      if (status !== 'success') {
        setStatus(validatemessage !== '' ? 'error' : undefined);
      }
      setInfo(validatemessage || helperText);
    }
  }, [inputProperty, validatemessage, helperText, readOnly, status]);


  return (

    <StyledFusionAixComponentsFxQrCodeWrapper>
      <Flex container={{ direction: 'column', justify: 'center', alignItems: 'center' }}>
        <FormField
          label={label}
          labelHidden={hideLabel}
          info={info}
          status={status}
          testId={testId}
        >
          <FormControl ariaLabel={label}>
            {readOnly ? (
              <img src={outputValue} />
            ) : (
              <QRCode inputProperty=''

                validatemessage={validatemessage}
                hideLabel={hideLabel}
                readOnly={readOnly}
                helperText={helperText}
                testId={testId}
                getPConnect
                value={inputProperty}
                label={label}
                onLoad={(event) => {
                  const blob = (event.currentTarget)?.src;
                  if (blob && propName) {
                    actions.updateFieldValue(propName, blob);
                    setOutputValue(blob);
                  }
                }}
              />
            )}
          </FormControl>
        </FormField>
      </Flex>
    </StyledFusionAixComponentsFxQrCodeWrapper>
  );
};

FusionAixComponentsFxQrCode.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxQrCode.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxQrCode;
