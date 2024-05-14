import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef} from 'react';
import { Input, FieldValueList, Text, Configuration } from '@pega/cosmos-react-core';
import IMask from 'imask';
import StyledFusionAixComponentsFxMaskedInputWrapper from './styles';

const FusionAixComponentsFxMaskedInput = props => {
  const {
    getPConnect,
    placeholder,
    validatemessage = '',
    label,
    mask,
    value,
    hideLabel = false,
    helperText = '',
    testId = '',
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
  const [maskObj, setMask] = useState(null);
  const ref = useRef(null);

  let { readOnly, required, disabled } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    prop => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [inputValue, setInputValue] = useState(value);
  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);

  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    if (ref?.current && !disabled && !readOnly) {

      const maskOptions= {
        mask,
        definitions: {
          // defaults are '0', 'a', '*'
          // You can extend by adding other characters
          A: /[A-Z]/
        }
      };
      if (maskObj) {
        maskObj.updateOptions(maskOptions);
      } else {
        setMask(IMask(ref.current, maskOptions));
      }
    }
  }, [ref, mask, disabled, readOnly, maskObj]);

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

  const displayComp = value || '';
  if (displayMode === 'DISPLAY_ONLY') {
    return (
      <Configuration>
        <Text>{displayComp}</Text>
      </Configuration>
    );
  } else if (displayMode === 'LABELS_LEFT') {
    return (
      <Configuration>
        <FieldValueList
          variant={hideLabel ? 'stacked' : variant}
          data-testid={testId}
          fields={[{ id: '1', name: hideLabel ? '' : label, value: displayComp }]}
        />
      </Configuration>
    );
  } else if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <Configuration>
        <Text variant='h1' as='span'>
          {displayComp}
        </Text>
      </Configuration>
    );
  }

  return (
    <StyledFusionAixComponentsFxMaskedInputWrapper>
     <Configuration>
      <Input
        {...additionalProps}
        ref={ref}
        label={label}
        labelHidden={hideLabel}
        info={validatemessage || helperText || mask}
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
    </Configuration>
    </StyledFusionAixComponentsFxMaskedInputWrapper>
  );
}




FusionAixComponentsFxMaskedInput.defaultProps = {
  value: '',
  hideLabel: false,
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: ''
};

FusionAixComponentsFxMaskedInput.propTypes = {
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

export default FusionAixComponentsFxMaskedInput;
