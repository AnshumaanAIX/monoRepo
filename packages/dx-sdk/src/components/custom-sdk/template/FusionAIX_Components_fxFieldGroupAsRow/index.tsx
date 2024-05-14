import React from 'react';
import { FieldGroup, Flex, Configuration, useTheme } from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxFieldGroupAsRowWrapper from './styles';

type FieldGroupAsRowProps = {
  heading: string;
  children: any;
};

export default function FusionAixComponentsFxFieldGroupAsRow(props: FieldGroupAsRowProps) {
  const { heading, children } = props;
  const theme = useTheme();
  return (
    <Configuration>
      <FieldGroup name={heading}>
        <StyledFusionAixComponentsFxFieldGroupAsRowWrapper theme={theme}>
          {children.map((child: any, i: number) => (
            <Flex container={{ direction: 'column' }} key={`r-${i + 1}`}>
              {child}
            </Flex>
          ))}
        </StyledFusionAixComponentsFxFieldGroupAsRowWrapper>
      </FieldGroup>
    </Configuration>
  );
}
