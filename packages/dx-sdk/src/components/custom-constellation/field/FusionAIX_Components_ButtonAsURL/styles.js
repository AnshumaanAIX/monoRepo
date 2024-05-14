import styled, { css } from 'styled-components';

export default styled.div((alignment) => {
  return css`
    margin: 8px 0;
    .alignment{
      align-text:${alignment ? alignment : 'left'}
    }
    .img-content{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: grey;
      margin-right: 20px;
    }
  `;
});
