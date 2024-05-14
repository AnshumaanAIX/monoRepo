import React,{ useState } from 'react';
import { ExpandCollapse, Flex} from '@pega/cosmos-react-core';
import { Label,Button } from 'govuk-react';
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
        <Button disabled={false} style={{ backgroundColor: "#1d70b8" }} onClick={() => setCollapsed(curState => !curState)} >
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
        <Label>This content is outside of the ExpandCollapse and so it will always be visible.</Label>
      </Flex>
    </StyledFusionAixComponentsFxExpandCollapseWrapper>
  );
}

FusionAixComponentsFxExpandCollapse.defaultProps = {
  NumCols: 1,
  templateOverrideMode: 'USE_TEMPLATE',
  children: []
};
