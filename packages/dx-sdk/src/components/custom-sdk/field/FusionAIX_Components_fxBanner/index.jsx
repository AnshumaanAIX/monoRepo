import React, { useState, useRef } from 'react';
import { Banner, Flex } from '@pega/cosmos-react-core';
import { Button } from 'govuk-react';
import StyledFusionAixComponentsFxBannerWrapper from './styles';

const FusionAixComponentsFxBanner = props => {
  const { messages, variants } = props;
  const [show, setShow] = useState(true);
  const bannerHandleRef = useRef(null);
  if (variants === 'none' || variants === undefined || variants === 'default') {
    return <h1>Please Select Variant</h1>;
  }
  return (
    <StyledFusionAixComponentsFxBannerWrapper>
      <Flex container={{ direction: 'column', gap: 2 }}>
        {show ? (
          <Banner
            variant={variants}
            messages={[messages]}
            onDismiss={() => setShow(false)}
            handle={bannerHandleRef}
          />

        ) : (

          <Button onClick={() => setShow(true)}>Open banner</Button>
        )}
      </Flex>
    </StyledFusionAixComponentsFxBannerWrapper>
  );
};

FusionAixComponentsFxBanner.defaultProps = {
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
  variant: 'none',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};


export default FusionAixComponentsFxBanner;
