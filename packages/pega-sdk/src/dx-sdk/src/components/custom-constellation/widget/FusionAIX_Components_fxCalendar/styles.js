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



// import { type themeDefinition } from '@pega/cosmos-react-core';
import styled, { css } from 'styled-components';

export default styled.div(({ theme }) => {
  return css`
    border: 0.0625rem solid ${theme.base.palette['border-line']};
    padding: 0.25rem;
    width: 100%;
    overflow: hidden;
    white-space: normal;
  `;
});
