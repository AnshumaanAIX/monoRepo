import React from 'react';
import { Count, Status, Alert } from '@pega/cosmos-react-core';
import { Tag, Select } from 'govuk-react';
import StyledFusionAixComponentsFxBadgeWrapper from './styles';

const FusionAixComponentsFxBadge = props => {
  const {variants, BadgeType, TagContent, SelectableContent, CountNumber } = props;
  if (BadgeType === undefined || BadgeType === 'none') {
    return <h1>Please Select Badge Type</h1>;
  }
  if (variants === 'none' || variants === undefined || variants === 'default') {
    return <h1>Please Select Variantv</h1>;
  }

  switch (BadgeType) {
    case 'Alert':
      return <Alert variant={variants} />;
    case 'Count':
      return <Count variant={variants}>{CountNumber}</Count>;
    case 'Status':
      return <Status variant={variants}>{variants}</Status>;
    case 'Tag':
      return <Tag>{TagContent}</Tag>;
    case 'Selection':
      return <Select id='selectable'>{SelectableContent}</Select>;

    default:<h1>Please Select Variants</h1>;
  }

  return <StyledFusionAixComponentsFxBadgeWrapper></StyledFusionAixComponentsFxBadgeWrapper>;

};

FusionAixComponentsFxBadge.defaultProps = {
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
  fieldMetadata: {},
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};


export default FusionAixComponentsFxBadge;
