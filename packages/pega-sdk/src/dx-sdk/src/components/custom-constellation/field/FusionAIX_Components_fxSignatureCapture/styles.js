// // utilizing theming, comment out, if want individual style
// import styled from 'styled-components';
// import { Configuration } from '@pega/cosmos-react-core';

// export default styled(Configuration)``;

// // individual style, comment out above, and uncomment here and add styles
// // import styled, { css } from 'styled-components';
// //
// // export default styled.div(() => {
// //  return css`
// //    margin: 0px 0;
// //  `;
// // });


import styled, { css } from 'styled-components';

export const StyledSignatureContent = styled.div(() => {
  return css`
    & button {
      border-radius: 0;
      border-bottom: none;
      padding: 0.25rem 0.5rem;
    }
  `;
});

export const StyledSignatureReadOnlyContent = styled.div(
  ({ theme }) => {
    return css`
      max-width: 40ch;
      border: 0.0625rem solid ${theme.base.palette['border-line']};
    `;
  }
);
