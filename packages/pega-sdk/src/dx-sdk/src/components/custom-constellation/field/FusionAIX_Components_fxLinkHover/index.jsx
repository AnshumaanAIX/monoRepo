import { useState, useEffect, useRef} from "react";
import { Input, FieldValueList, Text, Button } from "@pega/cosmos-react-core";
import PropTypes from "prop-types";
import StyledFusionAixComponentsFxLinkHoverWrapper from './styles';
import { Box,Typography } from '@material-ui/core';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsFxLinkHover = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    getPConnect,
    label,
    source,
    dPage,
    bLabel,
    bValue,
    isParameter,
    numberOfparameters,
    paramslabel1,
    paramsvalue1,
    paramslabel2,
    paramsvalue2,
    paramslabel3,
    paramsvalue3,
    PropertyVal
  } = props;
  const [options, setoptions] = useState([]);
  const length = options.length;
  let payload;
  switch (numberOfparameters) {
    case 'Two':
      payload = {
        dataViewParameters: {
          [paramslabel1]: paramsvalue1,
          [paramslabel2]: paramsvalue2
        }
      };
      break;
    case 'Three':
      payload = {
        dataViewParameters: {
          [paramslabel1]: paramsvalue1,
          [paramslabel2]: paramsvalue2,
          [paramslabel3]: paramsvalue3
        }
      };
      break;
    default:
    case 'One':
      payload = {
        dataViewParameters: {
          [paramslabel1]: paramsvalue1
        }
      };
      break;
  }

  useEffect(() => {
    if(source === 'Dpage') {
      PCore.getDataApiUtils()
      .getData(dPage, payload)
      .then(response => {
        const arr = [];
        console.log("response", response);
        response.data.data.map((ele, index) => {
          arr.push(ele[`${PropertyVal}`]);
        });
        setoptions(arr);
      })
      .catch(error => {
        console.log('error of fxLinkHover', error);
      });
    }

  }, [PropertyVal]);
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
              {bValue ? bValue : options}
            </Typography>
          </Box>
        }
        </div>
    </StyledFusionAixComponentsFxLinkHoverWrapper>
  );
}

FusionAixComponentsFxLinkHover.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: '',
  displayMode: null,
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  displayAs: 'defaultURL',
  widthSel: 'defaultWidth',
  customWidth: null,
  altText: 'constant',
  altTextOfImage: '',
  propaltTextOfImage: '',
  urlLabel: '',
  propUrlLabel: '',
  urlLabelSelection: 'constant',
  tableDisplayAs: 'link',
  hasSuggestions: false
};

FusionAixComponentsFxLinkHover.propTypes = {
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
  displayAs: PropTypes.string,
  widthSel: PropTypes.string,
  customWidth: PropTypes.number,
  altText: PropTypes.string,
  altTextOfImage: PropTypes.string,
  propaltTextOfImage: PropTypes.string,
  urlLabel: PropTypes.string,
  propUrlLabel: PropTypes.string,
  urlLabelSelection: PropTypes.string,
  tableDisplayAs: PropTypes.string,
  hasSuggestions: PropTypes.bool
};

export default FusionAixComponentsFxLinkHover;
