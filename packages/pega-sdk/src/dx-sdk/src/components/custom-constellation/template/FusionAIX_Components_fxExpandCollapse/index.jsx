import React,{ useState } from 'react';
import { Button, ExpandCollapse, Text, Flex, direction } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxExpandCollapseWrapper from './styles';

export default function FusionAixComponentsFxExpandCollapse(props) {

  const { getPConnect, children, template, label, NumCols, fxECDirection } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [showText, setShowText] = useState(true);

  if (fxECDirection === 'none' || fxECDirection === undefined) {
    return <h1>Please select required direction</h1>
  }

  return (
    <StyledFusionAixComponentsFxExpandCollapseWrapper>
      <Flex container={{ direction: fxECDirection === "Vertical" ? 'Column' : '' }} >
        <Button onClick={() => setCollapsed(curState => !curState)} >
          {collapsed ? 'Expand' : 'Collapse '}
        </Button>
        <ExpandCollapse
          dimension='width'
          collapsed={collapsed}
          min={''}
          max={''}
          transitionSpeed='0.25s'
          nullWhenCollapsed
          onAfterExpand={() => setShowText(true)}
          onBeforeCollapse={() => setShowText(false)}
        >
          {showText && children}
        </ExpandCollapse>
        <Text>This content is outside of the ExpandCollapse and so it will always be visible.</Text>
      </Flex>
    </StyledFusionAixComponentsFxExpandCollapseWrapper>
  );

}

FusionAixComponentsFxExpandCollapse.defaultProps = {
  NumCols: 1,
  templateOverrideMode: 'USE_TEMPLATE',
  children: []
};

FusionAixComponentsFxExpandCollapse.propTypes = {
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  template: PropTypes.string.isRequired
};
