// utilizing theming, comment out, if want individual style
import styled from 'styled-components';
import { Configuration } from '@pega/cosmos-react-core';

// individual style, comment out above, and uncomment here and add styles
// import styled, { css } from 'styled-components';
//
export default styled.div(() => {
 return css`
 margin: 8px 0;
 `;
});
