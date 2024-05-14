import styled, { css } from 'styled-components';

export default styled.div((textAlignment) => {
  return css`
    margin: 8px 0;
    .flex-text {
      text-align: center;
    }
  `;
});
