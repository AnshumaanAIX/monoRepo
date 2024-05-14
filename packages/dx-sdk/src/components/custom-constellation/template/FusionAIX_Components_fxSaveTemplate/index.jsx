import { useMemo, Children } from 'react';
import PropTypes from 'prop-types';
import { Button, OneColumnPage as OneColumn } from '@pega/cosmos-react-core';
import { ConfigurableLayout } from '@pega/cosmos-react-work';
// import { registerIcon } from '@pega/cosmos-react-core';

// temp
// import * as headlineIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/headline.icon';

import StyledFusionAixComponentsFxSaveTemplateWrapper from './styles';

import GetNextWork from './GetNextWork.jsx';
import { getLayoutDataFromRegion } from './utils';

// temp
// registerIcon(headlineIcon);

// currently getting 'icon' from props is not supported with iconRegistry
// have to manually get icon, so can't determine a runtime for now
// so "headline" icon is hardcoded.



// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxSaveTemplate(props) {

  // add back in icon when working
  // const { children, title, icon, useConfigurableLayout, getPConnect, enableGetNextWork } = props;
  const { children, dataPage, dpageParameters, title, useConfigurableLayout, getPConnect, enableGetNextWork } = props;
  const childArray = useMemo(() => {
    return Children.toArray(children);
  }, [children]);
  const layoutItemsA = useMemo(() => {
    return getLayoutDataFromRegion(childArray[0]);
  }, [childArray[0]]);

  console.log(childArray, 'childArray');
  const propValues = [];

  const handleSubmitForm = () => {
    if (childArray[0] && childArray[0]?.props?.getPConnect()?.getChildren()) {
      childArray[0]?.props
        ?.getPConnect()
        ?.getChildren()
        .map(child => {
          const pconn = child?.getPConnect();
          const propsChild = pconn?.getConfigProps();
          console.log(propsChild, 'propsChild');
          if (propsChild) {
            propValues.push({
              label:propsChild?.label,
              value:propsChild?.value
          });
          }
        });
    };
    let parametersList = [];
    if(dpageParameters){
      parametersList = dpageParameters.split(',');
    }
    console.log(propValues, 'propValues');
    console.log(dataPage, 'datapage');
    console.log(dpageParameters,'parameters');
    console.log(parametersList,'parameterslist');
    const dataViewName = dataPage;
    // const parameters = {
    //   [propValues[0].label]:propValues[0].value,
    //   [propValues[1].label]:propValues[1].value
    // };
    const mappedData = propValues.map((item, index) => {
      return {
          ...item,
          id: parametersList[index]
      };
  });

  console.log(mappedData,'mapped values');

  const jsonObject = {};
  mappedData.forEach(obj => {
    jsonObject[obj.id] = obj.value;
  });
    const parameters = jsonObject;
    const context = "app/primary_1";
    PCore.getDataPageUtils().getPageDataAsync(dataViewName, context, parameters)
      .then(response => {
        console.log("Response", response);
      })
      .catch(error => {
        console.log(error, "Error");
      });
  }
// temp
const tempIcon = "pi pi-headline";

return (

  <StyledFusionAixComponentsFxSaveTemplateWrapper>
    <div style={{ width: '50%',padding:'10px' }}>
      <div>{children[0]}</div>
      <div style={{display:'flex',justifyContent:'center'}}>
      <Button style={{marginTop:'10px',width:'20%'}} variant='primary' onClick={handleSubmitForm} compact={false}>
        Submit
      </Button>
      </div>

    </div>

  </StyledFusionAixComponentsFxSaveTemplateWrapper>

);



}

FusionAixComponentsFxSaveTemplate.defaultProps = {
  /* icon: '', */
  useConfigurableLayout: false
};

FusionAixComponentsFxSaveTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
  /* icon: PropTypes.string, */
  useConfigurableLayout: PropTypes.bool
};
