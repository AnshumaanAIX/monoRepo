import { URLDisplay } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxUrlWrapper from './styles';
import { useEffect } from 'react';

const FusionAixComponentsFxUrl = props => {
  const { getPConnect, label, newlink, time } = props;

  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setTimeout(() => {
        window.open(newlink, '_blank');
      }, time * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <StyledFusionAixComponentsFxUrlWrapper>

      <URLDisplay value={newlink} displayText={label} variant='link' target='_blank' />
    </StyledFusionAixComponentsFxUrlWrapper>
  );
};

FusionAixComponentsFxUrl.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
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

FusionAixComponentsFxUrl.propTypes = {
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

export default FusionAixComponentsFxUrl;
