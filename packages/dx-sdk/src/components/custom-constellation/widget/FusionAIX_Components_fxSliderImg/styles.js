import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 8px 0;
  `;
});

export const StyledSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 30px 0px;
`;

export const Styledarrows = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 1;
  bottom: -30px;
`;

export const Styledimage = styled.div`
  width: 100%;
  object-fit: cover;
  height: auto;
  border-radius: 10px;
`;
