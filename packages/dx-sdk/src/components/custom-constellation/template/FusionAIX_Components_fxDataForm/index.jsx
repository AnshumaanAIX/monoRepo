import { useEffect, useMemo, useState } from 'react';
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
import * as check from '@pega/cosmos-react-core/lib/components/Icon/icons/check.icon';
import * as warnSolid from '@pega/cosmos-react-core/lib/components/Icon/icons/warn-solid.icon';
import * as caretRight from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-right.icon';
import * as caretDown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon';

import StyledFusionAixComponentsFxDataFormWrapper from './styles';


// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxDataForm(props) {

  registerIcon(check);
  registerIcon(warnSolid);
  registerIcon(caretRight);
  registerIcon(caretDown);
  const {
    header,
    displayHeader,
    headerStyle,
    displayStatus,
    displayStatusField,
    numberOfColumns,
    children,
    isCollapsible,
    defaultCollapsibleBehavior
  } = props;
  const [collapsed, setCollapsed] = React.useState(defaultCollapsibleBehavior === 'Collapsed');

  const [formElms, setFormElms] = useState([]);

  useEffect(() => {
    const region = children[0] ? children[0].props.getPConnect() : [];
    if (region.getChildren()) {
      const elms = region.getChildren().map((child, index) => {
        const element = child.getPConnect().getComponent();
        if (
          ['TextInput', 'Email', 'TextArea'].includes(child.getPConnect().getComponentName()) ||
          element.props.readOnly
        ) {
          child.getPConnect().setInheritedProp('displayMode', 'DISPLAY_ONLY');
        }

        return child.getPConnect().getComponent();
      });
      setFormElms(elms);
    }
  }, [children]);

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
    <StyledFusionAixComponentsFxDataFormWrapper>
    <Flex
        className='status-form-header'
        container={{ justify: 'space-between', align: 'center' }}
      >
        <Flex container={{ direction: 'row', justify: 'start', align: 'center' }}>
          {displayStatus &&
            (displayStatusField ? (
              <Icon style={{ height: '1rem', width: '1rem' }} name='check' aria-label='Success' />
            ) : (
              <Icon
                style={{ height: '1rem', width: '1rem' }}
                name='warn-solid'
                aria-label='Warning'
              />
            ))}
          {displayHeader && (
            <Text variant={headerStyle === 'Headline' ? 'h3' : 'h4'}>{header}</Text>
          )}
        </Flex>
        {isCollapsible ? (
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
          <div></div>
        )}
      </Flex>
      <ExpandCollapse dimension='height' collapsed={collapsed} nullWhenCollapsed>
        <Grid
          container={{
            cols: `repeat(${colsValue}, 1fr)`,
            colGap: 2,
            rowGap: 1
          }}
          className='status-form-content'
        >
          {formElms.map((field, index) =>
            (field.props.value && field.props.value.length) || !field.props.label ? (
              <>{field}</>
            ) : (
              <>
                <div className='display-none'>
                  {field}
                  <Text variant='primary'>{field.props.label}</Text>
                </div>
              </>
            )
          )}
        </Grid>
      </ExpandCollapse>
    </StyledFusionAixComponentsFxDataFormWrapper>
  );

}

FusionAixComponentsFxDataForm.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxDataForm.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};
