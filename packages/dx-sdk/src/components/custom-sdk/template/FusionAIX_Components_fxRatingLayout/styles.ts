
import styled, { css } from 'styled-components';

interface MainProps {
  minWidth : any
}

export default styled.div<MainProps>(({ minWidth }
) => {
  return css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
    grid-gap: 1rem;
    padding-top: 1rem;
  `;
});
