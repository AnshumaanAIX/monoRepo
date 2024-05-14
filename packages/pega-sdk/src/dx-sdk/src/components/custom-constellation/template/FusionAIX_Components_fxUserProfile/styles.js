import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 8px 0;

    .grid-container {
      // display: grid; /* Makes the container a grid */
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Creates equal-sized columns */
      gap: 10px; /* Adds spacing between grid items */
    }
    .main-grid-wrapper{
      display: flex;
      padding: 24px;
    }
    .mainchildren-wrapper {
      display:flex
      padding: 24px
    }
    .children1{
  margin: -8px 0px;
}
.secondChild {
  grid-row: 1 / span 2; /* Spans first two rows */
}
.children2{
  background: white;
  border-radius: 8px;
  margin-left: 24px;
  padding: 24px;
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
    .card {
      background: white;
      border-radius: 8px;
      width: 264px;
      height: 143px;
      padding:15px
    }

    .tabs {
      list-style: none;
      margin: 0;
      padding: 0;
      display:flow
    }

    .tab {
      display: block; /* Key Change: Tabs become blocks */
      padding: 10px 15px;
      cursor: pointer;
      border-bottom: 1px solid #ccc; !important /* Border below each tab */
    }

    .tab.active {
       background-color: #fff;
       border-right: 1px solid #fff; /* Visually hide right border for active tab */
    }

    .tab:last-of-type {
      border-bottom: none; /* Remove border from the last tab */
    }

    .tab-content {
      display: none; /* Initially hide content*/
      padding: 15px;
    }

.element0, .element2 {
  grid-row: 1; /* Spans first row */
}

.profile {
  background: linear-gradient(to right, purple, violet);
  color: white;
  padding: 20px;
  display: flex;
}

.avatar {
  width: 100px;
  height: 100px;
  background: gray;
  border-radius: 50%;
}

.info {
  margin-left: 20px;
}

.tabs {
  margin-top: 20px;
}

.tabs button {
  margin-right: 10px;
}

.details {
  margin-top: 20px;
}
.second-child-elements{
  display: inline-flex;
  align-items: center;
}
  `;
});
