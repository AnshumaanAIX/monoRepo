
import React, { useState } from 'react';
import { Box, Button, Modal, ModalManager, TextField, Typography } from '@material-ui/core';
import { getComponentFromMap } from '@pega/react-sdk-components/lib/bridge/helpers/sdk_component_map';

import StyledFusionAixComponentsFxLinkHoverWrapper from './styles';



// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxLinkHover(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    label,
    required,
    disabled,
    value = '',
    validatemessage,
    status,
    onChange,
    onBlur,
    readOnly,
    testId,
    helperText,
    displayMode,
    hideLabel,
    PropertyVal,
    bLabel,
    bValue
  } = props;

  const handleMouseEnter = () => {
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    setIsModalVisible(false);
  };


  return (
    <StyledFusionAixComponentsFxLinkHoverWrapper>
      <div>
        <Button
          onMouseOver ={handleMouseEnter}
          onMouseLeave = {handleMouseLeave} variant='link'>
        {bLabel}
      </Button>
      </div>
      <div style={{marginTop:'10px'}}>
      {isModalVisible &&
            <Box component="section" sx={{ p: 2, border: '1px solid grey', width:'50%' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {bValue}
            </Typography>
          </Box>
        }
        </div>
    </StyledFusionAixComponentsFxLinkHoverWrapper>
  );
}
