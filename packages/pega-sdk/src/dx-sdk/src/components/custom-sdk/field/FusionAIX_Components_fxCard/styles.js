import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    .card {
      box-shadow: 0 0 0 2px hsl(0, 0%, 80%);
    }

    .btn {
      background-color: #007bff;
      color: #fff;
    }

    .btn:hover {
      background-color: greenyellow;
    }
  `;
});
