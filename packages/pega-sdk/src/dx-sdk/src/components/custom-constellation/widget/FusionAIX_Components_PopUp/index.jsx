import React,{ Fragment, memo, useEffect, useState } from 'react';
import { DateTimeDisplay, Card, CardHeader, CardContent, Button } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsPopUp(props) {

  const { getPConnect, label } = props;
  const className = 'FX-Translate-Work-Translate'
  // console.log(props,"propspropspropspropspropspropspropspropsinside popup");
  const [hideShow , setShowHide] = useState('')
   useEffect(()=>{
    const handleSub = (publishedData) => {
      // console.log(publishedData,"publishedDatapublishedData inside popup");
      setShowHide(publishedData?.ShowTranslationStudio)
    }
    PCore.getPubSubUtils().subscribe('showHide',handleSub , 'showHideRemove');
   },[])

  const Modal = () => {
    const options = {
      flowType: "pyStartCase",
      containerName: "primary",
      startingFields: {},
      openCaseViewAfterCreate: false,
      dockable: true
    };
    getPConnect()
      .getActionsApi()
      .createWork(className, options)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`${localizedVal('createWork completed', localeCategory)}`)
      })
  };

  return (
    <div style={{ display:'block'}}>
       <Button variant={'secondary'} onClick={Modal} style={{ width: 'fit-content' , float:'right' }}>
      {label}
    </Button>
    </div>

  );
};

FusionAixComponentsPopUp.defaultProps = {
  "label": "Create operator",
  "title": "Create operator",
  createLabel: null,
  updateLabel: null,
  createOperator: null,
  updateOperator: null,
  createDateTime: null,
  updateDateTime: null,
  resolveLabel: null,
  resolveOperator: null,
  resolveDateTime: null,
  hideLabel: false,
  defVal: '––'
};

FusionAixComponentsPopUp.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  label: PropTypes.string,
  createLabel: PropTypes.string,
  updateLabel: PropTypes.string,
  resolveLabel: PropTypes.string,
  createOperator: PropTypes.objectOf(PropTypes.any),
  updateOperator: PropTypes.objectOf(PropTypes.any),
  resolveOperator: PropTypes.objectOf(PropTypes.any),
  createDateTime: PropTypes.string,
  updateDateTime: PropTypes.string,
  resolveDateTime: PropTypes.string,
  hideLabel: PropTypes.bool
};

// as objects are there in props, shallow comparision fails & re-rendering of comp happens even with
// same key value pairs in obj. hence using custom comparison function on when to re-render
//const comparisonFn = (prevProps, nextProps) => {
//  return prevProps.updateDateTime === nextProps.updateDateTime;
//};
