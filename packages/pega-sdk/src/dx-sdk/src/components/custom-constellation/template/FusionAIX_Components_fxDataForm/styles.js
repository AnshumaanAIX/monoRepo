// utilizing theming, comment out, if want individual style
import { Configuration } from '@pega/cosmos-react-core';

import styled, { css } from 'styled-components';

export default styled.div(() => {
 return css`
 .status-form-header {
  margin-block-end: 0.5rem;
}

.status-form-content {
  margin-block-start: 0.5rem;
}

.form-one-column {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: calc(0.5rem) calc(1rem);
}

.form-two-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: calc(0.5rem) calc(1rem);
}

.form-three-column {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(0.5rem) calc(1rem);
}
.display-none :first-child {
  display: none;
}
 `;
});
