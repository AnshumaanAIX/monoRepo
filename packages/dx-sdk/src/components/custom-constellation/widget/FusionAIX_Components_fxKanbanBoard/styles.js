// utilizing theming, comment out, if want individual style
// import styled from 'styled-components';
// import { Configuration } from '@pega/cosmos-react-core';

// export default styled(Configuration)``;

// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export const StyledCardContent = styled.div(({theme}) => {
  return css`
    & > article {
      border: 0.0625rem solid ${theme.base.palette['border-line']};
      padding: 0.5rem;
      white-space: normal;
      background: ${theme.base.palette['primary-background']};
      margin-bottom: 0.25rem;
    }
  `;
});

export const MainCard = styled.div((height) => {
  return css`
    min-height: ${height};
    display: flex;
    flex-flow: row nowrap;
    gap: 0.5rem;
    padding: 0 0.5rem 0.5rem;
  `;
});

export const StyledColumn = styled.div(({theme}) => {
  return css`
    display: flex;
    flex-flow: column;
    flex: 1;
    background: ${theme.base.palette['app-background']};
    padding: 0.25rem;

    & > h2 {
      text-align: center;
      padding: 1rem 0;
    }
    & > div {
      display: flex;
      flex-flow: column;
      min-height: 10rem;
    }
  `;
});
