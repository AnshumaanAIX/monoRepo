import React from 'react';
import { FieldGroup, Flex, Configuration, useTheme } from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxFieldGroupAsRowWrapper from './styles';

export default function FusionAixComponentsFxFieldGroupAsRow(props) {
  const { heading, children } = props;
  const theme = useTheme();
  return (
    <Configuration>
      <FieldGroup name={heading}>
        <StyledFusionAixComponentsFxFieldGroupAsRowWrapper theme={theme}>
          {children.map((child, i) => (
            <Flex container={{ direction: 'column' }} key={`r-${i + 1}`}>
              {child}
            </Flex>
          ))}
        </StyledFusionAixComponentsFxFieldGroupAsRowWrapper>
      </FieldGroup>
    </Configuration>
  );
}
