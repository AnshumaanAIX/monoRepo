import PropTypes from 'prop-types';
import { Button, Input, Label } from '@pega/cosmos-react-core';
import React, { useState, useEffect } from 'react';

import StyledFusionAixComponentsFxDPageButtonWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxDPageButton = props => {
  const { getPConnect, value, placeholder, disabled, readOnly, required, label, testId, dataPage, buttonType } = props;

  const [events, setEvents] = useState([]);

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.value;

  // const handleOnChange = event => {
  //   const { value: updatedValue } = event.target;
  //   actions.updateFieldValue(propName, updatedValue);
  // };

  const handleClick = () => {

    if (buttonType === "d_page") {
      const dataViewName = dataPage;
      const parameters = {
        "Title": "Title123"
      };
      const context = "app/primary_1";
      PCore.getDataPageUtils().getPageDataAsync(dataViewName, context, parameters)
        .then(response => {
          setEvents(response);
          alert("Data has been Saved");
          console.log("Response", response);
          // window.location.reload();
        })
        .catch(error => {
          console.log(error, "Error");
        });
    }
    console.log('Button Clicked');
  };

  return (
    <StyledFusionAixComponentsFxDPageButtonWrapper>

      <Button onClick={handleClick} >{label}</Button>
    </StyledFusionAixComponentsFxDPageButtonWrapper>
  );
};

FusionAixComponentsFxDPageButton.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxDPageButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxDPageButton;
