// from react_root.js
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopLevelApp from './src/samples/TopLevelApp';
// import './common.css';
import FullPortal from './src/samples/FullPortal/index';
const outletElement = document.getElementById('outlet');


export const PegaSDK =  props => {
  <FullPortal />
  // if (outletElement) {
  //   render(
  //     // <BrowserRouter>
  //       ,
  //     // </BrowserRouter>,
  //     document.getElementById('outlet')
  //   );
  // }
}
 
  

