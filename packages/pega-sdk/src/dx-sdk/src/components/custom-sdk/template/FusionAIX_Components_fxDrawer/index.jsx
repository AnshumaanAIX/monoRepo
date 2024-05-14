import React,{ useState, useEffect } from 'react';
import { Card, Drawer, Flex, useTheme } from '@pega/cosmos-react-core';
import { Button,Label } from 'govuk-react';
import { StyledDrawerContent } from './Drawer.styles.jsx';
import StyledFusionAixComponentsFxDrawerWrapper from './styles';

export default function FusionAixComponentsFxDrawer(props) {
  const { children,placementType, positionType, size } =
    props;
  const [open, setOpen] = useState(false);
  const [childs, setChilds] = useState([]);
  const theme = useTheme();
  const inherited = children?.map(element => {
    return element.props.getPConnect().getConfigProps().inheritedProps;
  });

  useEffect(() => {
    setChilds(...childs, inherited);
  }, []);
  if (placementType === undefined || placementType === 'none') {
    return <h1>Please Select Placement Type</h1>;
  }
  if (positionType === undefined || positionType === 'none') {
    return <h1>Please Select Position Type</h1>;
  }

  return (
    <StyledFusionAixComponentsFxDrawerWrapper>
      <Card
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '20rem',
          width: '100%',
          border: `${theme.base.spacing} solid ${theme.base.colors.gray.light}`,
          backgroundColor: `${theme.base.colors.blue['extra-light']}`,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button disabled={false} style={{ backgroundColor: "#1d70b8" }} onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          open={open}
          onOuterClick={() => {
            setOpen(false);
          }}
          position={positionType}
          size={size}
          placement={placementType}
          transitionSpeed='0.25s'
          shadow={false}
        >
          <Flex
            as={StyledDrawerContent}
            container={{
              direction: 'column',
              justify: 'center',
              alignItems: 'center',
              gap: 2,
              pad: 4
            }}
          >
            <Label variant='h1'>This is a Drawer</Label>
            <Label>
              You can close this Drawer by clicking anywhere in the area outside of it, or by
              clicking the Button below.
            </Label>
            {children}
            <Button disabled={false} style={{ backgroundColor: "#1d70b8" }} onClick={() => setOpen(false)}>Close Drawer</Button>
          </Flex>
        </Drawer>
      </Card>
    </StyledFusionAixComponentsFxDrawerWrapper>
  );
}
