import React from 'react';
import { Rating } from '@pega/cosmos-react-core';

import StyledFusionAixComponentsFxRatingWrapper from './styles';

const FusionAixComponentsFxRating = props => {
  const { getPConnect, maximum1, rate, meta, min } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.value;

  if (meta < 1) {
    return <h1>Please provide some positive data to Meta Value</h1>;
  }

  return (
    <StyledFusionAixComponentsFxRatingWrapper>
      <Rating maxRating={maximum1} value={rate} metaInfo={` ${meta} reviews  `} />
    </StyledFusionAixComponentsFxRatingWrapper>
  );
};

FusionAixComponentsFxRating.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

export default FusionAixComponentsFxRating;
