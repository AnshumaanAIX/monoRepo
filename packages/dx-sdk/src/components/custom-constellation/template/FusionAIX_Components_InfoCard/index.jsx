import React,{ useEffect, useState } from 'react';
import { Grid, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';

import StyledFusionAixComponentsInfoCardWrapper from './styles';
import { getContext, getReferenceList } from './utils';

export default function FusionAixComponentsInfoCard(props) {
  const { getPConnect, children, template, label, referenceList } = props;
  const { contextName, referenceListStr, pageReferenceForRows, viewName } = getContext(getPConnect);

  const [elements, setElementsData] = useState([]);
  const pConn = getPConnect();
  getPConnect().setReferenceList(referenceListStr);

  useEffect(() => {
    const childComp = children[0].props
      .getPConnect()
      .getChildren()[0]
      .getPConnect()
      .getReferencedViewPConnect()
      .getPConnect();
    const context = getPConnect().getContextName();
    const rawFields =
      childComp?.meta.children?.[0]?.children || childComp?.presets?.[0].children?.[0]?.children;

    const eleData = [];
    referenceList.forEach((element, index) => {
      const data = [];
      rawFields.forEach(item => {
        // removing label field from config to hide title in the table cell
        const referenceListData = getReferenceList(pConn);
        const isDatapage = referenceListData.startsWith('D_');
        const pageReferenceValue = isDatapage
          ? `${referenceListData}[${index}]`
          : `${pConn.getPageReference()}${referenceListData.substring(
              referenceListData.lastIndexOf('.')
            )}[${index}]`;
        item = { ...item, config: { ...item.config, label: '' } };
        const config = {
          ...item
        };
        data.push(
          getPConnect().createComponent(config, null, null, {
            context,
            pageReference: pageReferenceValue,
            referenceList: referenceListData,
            hasForm: true
          })
        );
      });
      eleData.push(data);
    });
    setElementsData(eleData);
  }, []);
  return (
    <StyledFusionAixComponentsInfoCardWrapper>
      <Grid container={{ cols: 'repeat(2, 1fr)', alignItems: 'center', colGap: 1 }}>
        {elements.map((child, i) => (
          <Flex
            container={{ direction: 'column', alignItems: 'center' }}
            className='flex-text'
            key={`r-${i + 1}`}
          >
            {child}
          </Flex>
        ))}
      </Grid>
    </StyledFusionAixComponentsInfoCardWrapper>
  );
}

FusionAixComponentsInfoCard.defaultProps = {
  children: []
};

FusionAixComponentsInfoCard.propTypes = {
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  template: PropTypes.string.isRequired
};
