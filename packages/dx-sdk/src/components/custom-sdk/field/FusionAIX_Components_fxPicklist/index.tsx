import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import handleEvent from '@pega/react-sdk-components/lib/components/helpers/event-utils';
import Utils from '@pega/react-sdk-components/lib/components/helpers/utils';
import { getComponentFromMap } from '@pega/react-sdk-components/lib/bridge/helpers/sdk_component_map';


import StyledFusionAixComponentsFxPicklistWrapper from './styles';


// Can't use DropdownProps with 8.23 until getLocaleRuleNameFromKeys is NOT private
// interface FusionAixComponentsFxPicklistProps extends PConnFieldProps {
//   // If any, enter additional props that only exist on this componentName
//   onRecordChange?: any,
//   fieldMetadata?: any}


interface IOption {
  key: string;
  value: string;
}

// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxPicklist(props /* : FusionAixComponentsFxPicklistProps */) {
  const {
    getPConnect,
    label,
    required,
    disabled,
    value = '',
    datasource = [],
    validatemessage,
    status,
    readOnly,
    testId,
    helperText,
    displayMode,
    hideLabel,
    onRecordChange,
    fieldMetadata = {}
  } = props;
  let { placeholder } = props;
  placeholder = placeholder || 'Select...';
  const [options, setOptions] = useState<Array<IOption>>([]);
  const helperTextToDisplay = validatemessage || helperText;

  const FieldValueList = getComponentFromMap("FieldValueList");

  const thePConn = getPConnect();
  const actionsApi = thePConn.getActionsApi();
  const propName = thePConn.getStateProps()["value"];
  const className = thePConn.getCaseInfo().getClassName();
  const refName = propName?.slice(propName.lastIndexOf('.') + 1);
  console.log(props,'props-->');
  useEffect(() => {
    const list = Utils.getOptionList(props, getPConnect().getDataObject(''));   // 1st arg empty string until typedefs allow it to be optional
    const optionsList = [...list];
    optionsList.unshift({ key: placeholder, value: placeholder });
    setOptions(optionsList);
  }, [datasource]);

  const metaData = Array.isArray(fieldMetadata)
    ? fieldMetadata.filter((field) => field?.classID === className)[0]
    : fieldMetadata;

  let displayName = metaData?.datasource?.propertyForDisplayText;
  displayName = displayName?.slice(displayName.lastIndexOf('.') + 1);
  const localeContext = metaData?.datasource?.tableType === 'DataPage' ? 'datapage' : 'associated';
  const localeClass = localeContext === 'datapage' ? '@baseclass' : className;
  const localeName = localeContext === 'datapage' ? metaData?.datasource?.name : refName;
  const localePath = localeContext === 'datapage' ? displayName : '';

  let readOnlyProp = {};

  // if (displayMode === 'LABELS_LEFT') {
  //   return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  // }

  // if (displayMode === 'STACKED_LARGE_VAL') {
  //   return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  // }

  if (readOnly) {
    readOnlyProp = { readOnly: false };
  }

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  const handleChange = evt => {
    const selectedValue = evt.target.value === placeholder ? '' : evt.target.value;
    handleEvent(actionsApi, 'changeNblur', propName, selectedValue);
    if (onRecordChange) {
      onRecordChange(evt);
    }
  };

  // Material UI shows a warning if the component is rendered before options are set.
  //  So, hold off on rendering anything until options are available...
  return options.length === 0 ? null : (
    <StyledFusionAixComponentsFxPicklistWrapper>
    <TextField
      fullWidth
      variant={readOnly ? 'standard' : 'outlined'}
      helperText={helperTextToDisplay}
      placeholder={thePConn.getLocalizedValue(placeholder, '', '')}  // 2nd and 3rd args empty string until typedef marked correctly
      size='small'
      required={required}
      disabled={disabled}
      onChange={!readOnly ? handleChange : undefined}
      error={status === 'error'}
      label={label}
      value={value === '' && !readOnly ? placeholder : value}
      select
      InputProps={{ ...readOnlyProp, ...testProp }}
    >
      {options.map((option: any) => (
        <MenuItem key={option.key} value={option.key}>
          {thePConn.getLocalizedValue(
            option.value,
            localePath,
            thePConn.getLocaleRuleNameFromKeys(localeClass, localeContext, localeName)
          )}
        </MenuItem>
      ))}
    </TextField>
    </StyledFusionAixComponentsFxPicklistWrapper>
  );
}
