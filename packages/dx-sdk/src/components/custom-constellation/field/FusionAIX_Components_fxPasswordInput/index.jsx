import PropTypes from 'prop-types';
import { Input,  FieldValueList, Text } from '@pega/cosmos-react-core';
import { useEffect, useState, useRef } from 'react';
import StyledFusionAixComponentsFxPasswordInputWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxPasswordInput = props => {

  const {
    getPConnect,
    placeholder,
    validatemessage,
    label,
    hideLabel = false,
    helperText,
    testId,
    fieldMetadata,
    additionalProps,
    displayMode,
    variant,
    hasSuggestions
  } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;
  const maxLength = fieldMetadata?.maxLength;
  const hasValueChange = useRef(false);

  let { readOnly, required, disabled } = props;
  const { value } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    prop => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [inputValue, setInputValue] = useState(value);
  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);
  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (!hasSuggestions && status !== 'success') {
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions, status]);

  const displayComp = value ? '***********' : '';
  if (displayMode === 'DISPLAY_ONLY') {
    return <Text>{displayComp}</Text>;
  } else if (displayMode === 'LABELS_LEFT') {
    return (
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
      />
    );
  } else if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <Text variant='h1' as='span'>
        {displayComp}
      </Text>
    );
  }

  return (
    <StyledFusionAixComponentsFxPasswordInputWrapper>

         <Input
        {...additionalProps}
        type='password'
        label={label}
        labelHidden={hideLabel}
        info={validatemessage || helperText}
        data-testid={testId}
        value={inputValue}
        status={status}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        onChange={(e) => {
          if (hasSuggestions) {
            setStatus(undefined);
          }
          setInputValue(e.currentTarget.value);
          if (value !== e.currentTarget.value) {
            actions.updateFieldValue(propName, e.currentTarget.value);
            hasValueChange.current = true;
          }
        }}
        onBlur={(e) => {
          if ((!value || hasValueChange.current) && !readOnly) {
            actions.triggerFieldChange(propName, e.currentTarget.value);
            if (hasSuggestions) {
              pConn.ignoreSuggestion();
            }
            hasValueChange.current = false;
          }
        }}

      />
    </StyledFusionAixComponentsFxPasswordInputWrapper>
  );
};

FusionAixComponentsFxPasswordInput.defaultProps = {
  value: '',
  hideLabel: false,
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: ''
};

FusionAixComponentsFxPasswordInput.propTypes = {
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxPasswordInput;
