// import styled, { css } from 'styled-components';

// export default styled.div(() => {
//   return css`
//     margin: 0px 0;
//   `;
// });



import styled, { css } from 'styled-components';

interface CardContentProps {
  maxHeight:any
}

export const StyledCardContent = styled.div<CardContentProps>(({ maxHeight }) => {
  return css`
    max-height: ${maxHeight};
    overflow-y: auto;
  `;
});

export const StyledGenAIComponent = styled.div``;
