import styled, { css } from 'styled-components';
import { defaultThemeProp } from '@pega/cosmos-react-core';
export const StyledDrawerContent = styled.div(props => {
  const {
    theme: { base }
  } = props;
  return css`
    height: 100%;
    background-color: ${base.palette['primary-background']};
  `;
});
StyledDrawerContent.defaultProps = defaultThemeProp;
