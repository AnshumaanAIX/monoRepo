import React from 'react';
import { Link } from 'govuk-react';

import StyledFusionAixComponentsFxUrlWrapper from './styles';
import { useEffect } from 'react';

const FusionAixComponentsFxUrl = props => {
  const { label, newlink, time } = props;

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

      <Link href={newlink} target='_blank'>{label}</Link>

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

export default FusionAixComponentsFxUrl;
