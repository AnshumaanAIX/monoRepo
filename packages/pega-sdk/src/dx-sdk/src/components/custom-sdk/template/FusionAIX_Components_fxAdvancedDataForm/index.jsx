import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Grid,
  Text,
  Icon,
  registerIcon,
  ExpandCollapse,
  Button
} from '@pega/cosmos-react-core';
import React from 'react';
import * as check from '@pega/cosmos-react-core/lib/components/Icon/icons/check.icon';
import * as warnSolid from '@pega/cosmos-react-core/lib/components/Icon/icons/warn-solid.icon';
import * as caretRight from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-right.icon';
import * as caretDown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon';
import * as pencilSolid from '@pega/cosmos-react-core/lib/components/Icon/icons/pencil-solid.icon';


import StyledFusionAixComponentsFxAdvancedDataFormWrapper from "./styles";

//  Can't use FusionAixComponentsFxAdvancedDataFormProps until getPConnect().getChildren()[0] is fixed
// interface FusionAixComponentsFxAdvancedDataFormProps extends PConnProps {
//   // If any, enter additional props that only exist on this componentName
//   NumCols?: string,
//   instructions?: string,
//   // eslint-disable-next-line react/no-unused-prop-types
//   children: Array<any>
// }


// Duplicated runtime code from React SDK

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxAdvancedDataForm(props /* : FusionAixComponentsFxAdvancedDataFormProps */) {
  registerIcon(check);
  registerIcon(warnSolid);
  registerIcon(caretRight);
  registerIcon(caretDown);
  registerIcon(pencilSolid);
  const {
    getPConnect,
    displayStatus,
    statusField,
    primaryHeaderType,
    primaryHeaderText,
    primaryHeaderField,
    primaryVariant,
    secondaryHeaderType,
    secondaryHeaderText,
    secondaryHeaderField,
    mainFormAction,
    localAction,
    localActionType,
    modalHeader,
    buttonVariant,
    buttonLabel,
    // displayIcon,
    // iconPosition,
    hideContent,
    defaultCollapsibleBehavior,
    Action,
    assignmentId,
    caseID,
    containerName,
    numberOfColumns,
    children,
    isSetBackground
  } = props;

  const theContainerName = getPConnect().getContainerName()
  const [collapsed, setCollapsed] = React.useState(defaultCollapsibleBehavior === 'Collapsed');

  const [formElms, setFormElms] = useState([]);

  const openActionModal = () => {
    if (Action == 'localAction') {
      getPConnect().getActionsApi().openLocalAction(localAction, {
        type: localActionType,
        containerName: 'modal',
        name: modalHeader
      });
    } else {
      getPConnect().getActionsApi().openAssignment(
        assignmentId, caseID,
        { containerName: theContainerName })
    }
  };

  useEffect(() => {
    const elms = [];
    const region = children[0] ? children[0].props.getPConnect() : [];
    if (region.getChildren()) {
      region.getChildren().map(child => {
        child.getPConnect().setInheritedProp('readOnly', true);
        elms.push(child.getPConnect().getComponent());
      });
      setFormElms(elms);
    }
  }, [children[0]]);

  let colsValue;
  switch (numberOfColumns) {
    case 'Two':
      colsValue = 2;
      break;
    case 'Three':
      colsValue = 3;
      break;
    default:
    case 'One':
      colsValue = 1;
      break;
  }

  return (
    <StyledFusionAixComponentsFxAdvancedDataFormWrapper className='advanced-form-wrapper' bgcolor={isSetBackground}>
    <Flex
        className='status-form-header'
        container={{ justify: 'space-between', align: 'center' }}
      >
        <Flex
          container={{ direction: 'row', justify: 'start', align: 'center' }}
          className='status-form-header-left'
        >
          {displayStatus &&
            (statusField ? (
              <Icon style={{ height: '1rem', width: '1rem' }} name='check' aria-label='Success' />
            ) : (
              <Icon
                style={{ height: '1rem', width: '1rem' }}
                name='warn-solid'
                aria-label='Warning'
              />
            ))}
          <Flex
            className='status-form-header-text'
            container={{ direction: 'row', justify: 'start', align: 'center' }}
          >
            {primaryHeaderType && (
              <Text
                variant={
                  primaryVariant === 'paragraph' || primaryVariant === 'bold'
                    ? 'primary'
                    : primaryVariant
                }
                className={primaryVariant === 'bold' ? 'bold-header' : ''}
              >
                {primaryHeaderType === 'property' ? primaryHeaderField : primaryHeaderText}
              </Text>
            )}
            {secondaryHeaderType && (
              <Text variant='primary'>
                {secondaryHeaderType === 'property' ? secondaryHeaderField : secondaryHeaderText}
              </Text>
            )}
          </Flex>
        </Flex>
        {mainFormAction === 'collapsibleMode' ? (
          <Button
            variant='text'
            label={collapsed ? 'Expand' : 'Collapse'}
            icon
            compact={false}
            onClick={() => setCollapsed(curState => !curState)}
          >
            <Icon name={collapsed ? 'caret-right' : 'caret-down'} />
          </Button>
        ) : (
          mainFormAction === 'buttonMode' && (
            <Button
              variant={buttonVariant}
              label={buttonLabel}
              compact={false}
              onClick={openActionModal}
            >
              {buttonLabel}
            </Button>
          )
        )}
      </Flex>
      {(!hideContent || mainFormAction === 'collapsibleMode') && (
        <ExpandCollapse dimension='height' collapsed={collapsed} nullWhenCollapsed>
          <Grid
            container={{
              cols: `repeat(${colsValue}, 1fr)`,
              colGap: 2,
              rowGap: 1
            }}
            className='status-form-content'
          >
            {formElms.map(field => (field.props.value && field.props.value.length) || !field.props.label ? (
              <>{field}</>
            ) : (
              <>
                <div className='display-none'>
                  {field}
                  <Text variant='primary'>{field.props.label}</Text>
                </div>
              </>
            ))}
          </Grid>
        </ExpandCollapse>
      )}
    </StyledFusionAixComponentsFxAdvancedDataFormWrapper>
  );
}
