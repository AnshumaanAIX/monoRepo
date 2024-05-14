import React,{ useState, useEffect, useRef} from "react";
import { Input, FieldValueList, Button } from "@pega/cosmos-react-core";
import PropTypes from "prop-types";


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
const FusionAixComponentsOpenAssignmen = props => {
  const { getPConnect, localAction, typeModal, typeAction, modalHeader, label, assignmentId, caseID, assignKey, size, variant } = props;
  let assignKeyDemo;
  if (assignKey == undefined) {
    assignKeyDemo = 0;
  } else {
    assignKeyDemo = assignKey;
  }
  let variantcode;
  switch (variant) {
    case 'primary-filled' || 'primary-outlined':
      variantcode = 'primary'
      break;
    case 'secondary-filled' || 'secondary-outlined':
      variantcode = 'secondary'
      break;
      default:
        variantcode = 'secondary'
          break;
  }
  console.log(props, "openlocalaction express");
  const Modal = () => {
    if (typeModal == 'assignment') {
      PCore.getMashupApi().openAssignment(assignmentId, 'app', {
        containerName: 'modal',
        pageName: 'pyEmbedAssignment'
      });
    } else {
      switch (typeAction) {
        case 'assignment':
          getPConnect().getActionsApi().openLocalAction(localAction, {
            type: 'assignment',
            containerName: 'modal',
            name: modalHeader,
          });
          break;
        case 'express':
          if (assignKey !== undefined) {
            getPConnect().getActionsApi().openLocalAction(localAction, {
              type: 'express',
              containerName: 'modal',
              assignKey: assignKeyDemo,
              caseID: caseID,
              name: modalHeader
            });
          } else {
            getPConnect().getActionsApi().openLocalAction(localAction, {
              type: 'express',
              containerName: 'modal',
              name: modalHeader
            });
          }
          break;
        case 'case':
          getPConnect().getActionsApi().openLocalAction(localAction, {
            type: 'case',
            containerName: 'modal',
            name: modalHeader,
          });
        case 'stage':
          getPConnect().getActionsApi().openLocalAction(localAction, {
            name: modalHeader,
            type: 'stage',
            containerName: 'modal',
            assignKey: assignmentId,
            caseID: caseID
          });
      }
    }
  };
  return (
    <Button size={size} variant={variantcode} onClick={Modal}>
      {label}
    </Button>
  );
};

FusionAixComponentsOpenAssignmen.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  displayMode: null,
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  displayAs: 'defaultURL',
  widthSel: 'defaultWidth',
  customWidth: null,
  altText: 'constant',
  altTextOfImage: '',
  propaltTextOfImage: '',
  urlLabel: '',
  propUrlLabel: '',
  urlLabelSelection: 'constant',
  tableDisplayAs: 'link',
  hasSuggestions: false
};

FusionAixComponentsOpenAssignmen.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  displayMode: PropTypes.string,
  additionalProps: PropTypes.objectOf(PropTypes.any),
  variant: PropTypes.string,
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  displayAs: PropTypes.string,
  widthSel: PropTypes.string,
  customWidth: PropTypes.number,
  altText: PropTypes.string,
  altTextOfImage: PropTypes.string,
  propaltTextOfImage: PropTypes.string,
  urlLabel: PropTypes.string,
  propUrlLabel: PropTypes.string,
  urlLabelSelection: PropTypes.string,
  tableDisplayAs: PropTypes.string,
  hasSuggestions: PropTypes.bool
};

export default FusionAixComponentsOpenAssignmen;
