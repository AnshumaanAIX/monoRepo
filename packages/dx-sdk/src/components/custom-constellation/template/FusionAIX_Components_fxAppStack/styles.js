import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 8px 0;
    .grid-container {
      position: relative; /* For button positioning */
      height: 396px;
      padding: 24px;
      border-radius: 8px;
      border: 1px;
      background-color:white
    }
    .flexChild {
      width: 269.5px;
      height: 140px;
      padding: 16px, 0px, 16px, 0px
      border-radius: 4px
      border: 0px, 1px, 0px, 0px
      gap: 16px

    }
    .top-right-button {
      position: absolute;
    }
    .bold-header {
      font-weight: bold;
    }
    .status-form-header-left {
      column-gap: calc(0.5rem);
      align-items: center;
    }
    .status-form-header-text {
      align-items: baseline;
      column-gap: calc(0.5rem);
    }
  `;
});
