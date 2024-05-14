import React,{ useEffect, useState } from 'react';
import { Grid, Flex, Text, Icon, registerIcon } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import * as mobile from '@pega/cosmos-react-core/lib/components/Icon/icons/mobile-phone-solid.icon';
import StyledFusionAixComponentsFxAppStackWrapper from './styles';

// Duplicated runtime code from Constellation Design System Component
export const getContext = getPConnect => {
  const contextName = getPConnect().getContextName();
  const pageReference = getPConnect().getPageReference();
  // eslint-disable-next-line prefer-const
  let { readonlyContextList, referenceList = readonlyContextList } =
    getPConnect().getStateProps()?.config || getPConnect().getStateProps();
  const pageReferenceForRows = referenceList.startsWith('.')
    ? `${pageReference}.${referenceList.substring(1)}`
    : referenceList;
  const viewName = getPConnect().viewName;

  // removing "caseInfo.content" prefix to avoid setting it as a target while preparing pageInstructions
  // skipping the removal as StateMachine itself is removing this case info prefix while preparing pageInstructions
  // referenceList = pageReferenceForRows.replace(PCore.getConstants().CASE_INFO.CASE_INFO_CONTENT, '');

  return {
    contextName,
    referenceListStr: referenceList,
    pageReferenceForRows,
    viewName
  };
};

export const getReferenceList = pConn => {
  let resolvePage = pConn.getComponentConfig().referenceList.replace('@P ', '');
  if (resolvePage.includes('D_')) {
    resolvePage = pConn.resolveDatasourceReference(resolvePage);
    if (resolvePage?.pxResults) {
      resolvePage = resolvePage?.pxResults;
    } else if (resolvePage.startsWith('D_') && !resolvePage.endsWith('.pxResults')) {
      resolvePage = `${resolvePage}.pxResults`;
    }
  }
  return resolvePage;
};

// Duplicated runtime code from Constellation Design System Component
export const getView = (viewObject, getPConnect) => {
  return getPConnect.createComponent(viewObject);
};
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxAppStack(props) {
  // let nCols = parseInt(NumCols);

  //console.log(`Rendering ${getPConnect()?.getComponentName()} with ${template} with ${children?.length} Region(s)`);
  const { getPConnect, children, template, label, referenceList, NumCols, buttonLabel, buttonVariant, header, link, isIcon } = props;
  let referencelistObject;
  const [formElms, setFormElms] = useState([]);
  const [tableView, setTableView] = useState([]);
  const [elements, setElementsData] = useState([]);
  const [error, setError] = useState(false);
  const [referencedata, setreferencedata] = useState([]);
  const pConn = getPConnect();
  const {
    CONTAINER_TYPE: { MULTIPLE },
    PUB_SUB_EVENTS: { EVENT_SHOW_CANCEL_ALERT }
  } = PCore.getConstants();
  const refView = children[0].props
    .getPConnect()
    ?.getChildren()[0]
    .getPConnect()
    .getReferencedViewPConnect()
    .getPConnect()
    .getRawMetadata();

  registerIcon(mobile);

  useEffect(() => {
    const dataObjectClass = refView?.config?.contextClass;
    console.log(dataObjectClass, "dataObjectClassdataObjectClassdataObjectClass", props);
    const dataObjectTokens = dataObjectClass.split('-');
    const dataObjectName = dataObjectTokens[dataObjectTokens.length - 1];
    const listDataPage = `D_${dataObjectName}`;
    console.log(listDataPage);
    const dataPageKeys = PCore.getDataTypeUtils().getDataPageKeys(listDataPage) || [];

    if (dataPageKeys.length === 0) {
      PCore.getRestClient()
        .invokeRestApi('showView', {
          queryPayload: {
            page: `${dataObjectName}s`,
            pageClass: `${dataObjectTokens[0]}-${dataObjectTokens[1]}-UIPages`
          }
        })
        .then(response => {
          const { datapages, dataTypes } = response.data.uiResources.resources;
          PCore.getMetadataUtils().updateStores({ datapages, dataTypes });
        });
    }

    const { subscribe, unsubscribe } = PCore.getPubSubUtils();
    const { DATA_OBJECT_CREATED, DATA_OBJECT_UPDATED, DATA_OBJECT_DELETED } =
      PCore.getConstants().PUB_SUB_EVENTS.DATA_EVENTS;
    const loadEvents = evvt => {
      console.log(evvt);
    };
    subscribe(DATA_OBJECT_CREATED, () => loadEvents(), 'DATA_OBJECT_CREATED');
    subscribe(DATA_OBJECT_UPDATED, () => loadEvents(), 'DATA_OBJECT_UPDATED');
    subscribe(DATA_OBJECT_DELETED, () => loadEvents(), 'DATA_OBJECT_DELETED');

    return () => {
      unsubscribe(DATA_OBJECT_CREATED, 'DATA_OBJECT_CREATED');
      unsubscribe(DATA_OBJECT_UPDATED, 'DATA_OBJECT_UPDATED');
      unsubscribe(DATA_OBJECT_DELETED, 'DATA_OBJECT_DELETED');
    };
  }, [refView]);

  useEffect(() => {
    const containerMgr = getPConnect().getContainerManager();
    containerMgr.initializeContainers({ type: MULTIPLE });
  }, [MULTIPLE, getPConnect()]);

  useEffect(() => {
    const viewObject = {
      ...refView,
      config: {
        ...refView.config
      }
    };
    console.log(viewObject);
    const loadview = getView(viewObject, getPConnect());
    setTableView(loadview);
    console.log(loadview, 'refView');
    if (loadview) {
      // PCore.getDataPageUtils().disableCache();
      getChildrenObject(loadview);
    }
  }, [children, refView]);

  const getChildrenObject = loadview => {
    console.log(loadview, 'tableView?.props');
    let { getPConnect, children, template, label, referenceList, heading, isButton } =
      loadview?.props;
    const pConn = getPConnect();
    console.log(referenceList, children);
    const { contextName, referenceListStr, pageReferenceForRows, viewName } =
      getContext(getPConnect);
    console.log(referenceListStr, 'referenceListStr');
    referencelistObject = referenceListStr;
    const context = getPConnect().getContextName();
    const rawFields =
      loadview?.props?.getPConnect()?.meta.children?.[0]?.children ||
      loadview?.props?.getPConnect()?.presets?.[0].children?.[0]?.children;
    console.log(referenceList, rawFields, 'inside the info card');
    setreferencedata(referenceList);
    const eleData = [];
    referenceList.forEach((element, index) => {
      const data = [];
      rawFields.forEach(item => {
        // removing label field from config to hide title in the table cell
        console.log(item, "itemitemitemitem", element, index);
        const referenceListData = getReferenceList(pConn);
        const isDatapage = referenceListData.startsWith('D_');
        const pageReferenceValue = isDatapage
          ? `${referenceListData}[${index}]`
          : `${pConn.getPageReference()}${referenceListData.substring(
            referenceListData.lastIndexOf('.')
          )}[${index}]`;

        item = { ...item, config: { ...item.config } };
        const config = {
          ...item
        };

        const PConnetObjectData = getPConnect().createComponent(config, null, null, {
          context,
          pageReference: pageReferenceValue,
          referenceList: referenceListData,
          hasForm: true,
          isBulkAction: true,
          containerName: getPConnect()?.getContainerName() || PCore.getConstants().MODAL
        });
        PConnetObjectData.props.getPConnect().setInheritedProp('readOnly', true);
        data.push(PConnetObjectData);
      });
      eleData.push(data);
    });
    console.log(eleData, 'eleData');
    setElementsData(eleData);
  };
  console.log(NumCols, "NumColsNumCols", elements);
  return (
    <StyledFusionAixComponentsFxAppStackWrapper>
      <div class="grid-container">
        <div style={{ display: 'flex' }}>
          {isIcon && <Icon name='mobile-phone-solid' />}
          {header && <Text variant='h3' >
            {header}
          </Text>}
        </div>
        <div style={{ borderTop: '1px solid' }}></div>
        <Grid container={{ cols: `repeat(${NumCols}, 1fr)` }} >
          {elements.map((child, i) => (
            <Flex
              container={{ direction: 'column', alignItems: 'center', justify: 'center', alignContent: 'center' }}
              className='flexChild'
              key={`r-${i + 1}`}
            >
              <a href={referencedata[i]?.[link]} target='_blank' >
                {child}
              </a>

            </Flex>
          ))}
        </Grid>
        {/* <Button variant={buttonVariant} className="top-right-button">{buttonLabel}</Button> */}
      </div>
    </StyledFusionAixComponentsFxAppStackWrapper>
  );
}

FusionAixComponentsFxAppStack.defaultProps = {
  NumCols: 1,
  templateOverrideMode: 'USE_TEMPLATE',
  children: []
};

FusionAixComponentsFxAppStack.propTypes = {
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  template: PropTypes.string.isRequired
};
