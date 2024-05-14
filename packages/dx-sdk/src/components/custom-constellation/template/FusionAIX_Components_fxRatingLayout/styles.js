
import styled, { css } from 'styled-components';

export default styled.div(({ minWidth }) => {
  return css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
    grid-gap: 1rem;
    padding-top: 1rem;
  `;
});
