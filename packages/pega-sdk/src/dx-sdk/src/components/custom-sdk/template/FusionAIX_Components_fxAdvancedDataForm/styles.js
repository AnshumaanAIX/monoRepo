import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
  .advanced-form-wrapper {
    display: grid !important;
    background-color: ${props => props.bgcolor == true ? 'white' : 'red'};
  }
  .bold-header {
    font-weight: bold;
  }

  .status-form-header {
    align-items: center;
    margin-block-end: 0.5rem;
  }

  .status-form-header-left {
    column-gap: calc(0.5rem);
    align-items: center;
  }

  .status-form-header-text {
    align-items: baseline;
    column-gap: calc(0.5rem);
  }

  .status-form-content {
    margin-block-start: 0.5rem;
  }
  .display-none :first-child {
    display: none;
  }
  `;
});
