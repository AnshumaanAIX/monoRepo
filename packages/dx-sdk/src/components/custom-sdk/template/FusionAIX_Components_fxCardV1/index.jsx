import React ,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { OneColumnPage as OneColumn } from '@pega/cosmos-react-core';
import { registerIcon } from '@pega/cosmos-react-core';
import { ConfigurableLayout } from '@pega/cosmos-react-work';
import { Card, CardHeader, CardContent, CardFooter, Text, Button } from '@pega/cosmos-react-core';
// import Button from '@mui/material/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// temp
//import * as headlineIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/headline.icon';

import StyledFusionAixComponentsFxCardV1Wrapper from './styles';

import GetNextWork from './GetNextWork';
import { getLayoutDataFromRegion } from './utils';
import { Grid } from '@material-ui/core';

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

export const getView = (viewObject, getPConnect) => {
  return getPConnect.createComponent(viewObject);
};

export default function FusionAixComponentsFxCardV1(props) {

  const { children, title, icon, useConfigurableLayout, getPConnect, enableGetNextWork } = props;
  let referencelistObject;
  const [tableView, setTableView] = useState([]);
  const [referencedata, setreferencedata] = useState([]);
  const [elements, setElementsData] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [dialogData, setDialogData] = useState(null);


  // const childArray = useMemo(() => {
  //   return Children.toArray(children);
  // }, [children]);
  // const layoutItemsA = useMemo(() => {
  //   return getLayoutDataFromRegion(childArray[0]);
  // }, [childArray[0]]);

  const refView = children[0].props
    .getPConnect()
    ?.getChildren()[0]
    .getPConnect()
    .getReferencedViewPConnect()
    .getPConnect()
    .getRawMetadata();

  console.log(refView, 'refView');


  useEffect(() => {
    const dataObjectClass = refView?.config?.contextClass;
    const viewName = children[0]?.props?.getPConnect().viewName;
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
            page: `${viewName}`,
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
    const viewObject = {
      ...refView,
      config: {
        ...refView.config
      }
    };
    const loadview = getView(viewObject, getPConnect());
    setTableView(loadview);
    if (loadview) {
      // PCore.getDataPageUtils().disableCache();
      getChildrenObject(loadview);
    }
  }, [children, refView]);

  const getChildrenObject = loadview => {
    let { getPConnect, children, template, label, referenceList, heading, isButton } =
      loadview?.props;
    const pConn = getPConnect();
    console.log(referenceList, 'referenceList');
    const { contextName, referenceListStr, pageReferenceForRows, viewName } =
      getContext(getPConnect);
    referencelistObject = referenceListStr;
    const context = getPConnect().getContextName();
    const rawFields =
      loadview?.props?.getPConnect()?.meta.config?.children?.[0]?.children ||
      loadview?.props?.getPConnect()?.presets?.[0].children?.[0]?.children;
    setreferencedata(referenceList);
    const eleData = [];
    referenceList.forEach((element, index) => {
      const data = [];
      rawFields.forEach(item => {
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
      console.log(eleData, 'eleData');
      eleData.push(data);
    });
    setElementsData(eleData);
  };



  const handleOpenView = (obj) => {
    console.log(obj, 'obj data');
    setOpenView(true);
    setDialogData(obj);
  };

  const handleEditView = (obj) => {
    getPConnect().getActionsApi().getDataObjectView(obj.classID, { pyGUID: obj.pyGUID }, 'pyEdit').then((res) => {
      console.log(res, 'response');
      // getDataObjectView success handling
    }).catch(() => {
      // getDataObjectView failure handling
    });
  };

  const handleClose = () => {
    setOpenView(false);
  };


  // temp
  const tempIcon = "pi pi-headline";

  return (
    <StyledFusionAixComponentsFxCardV1Wrapper>
      <div style={{ display: 'flex' }}>
        {referencedata.map((obj, index) => (
          <Card key={index} style={{ width: '33%', margin: '10px' }} >
            <CardHeader>
              <Text variant='h2'>{title}</Text>
            </CardHeader>
            <CardContent>
              <div>
                <strong>{Object.keys(obj)[2]}: </strong> {Object.values(obj)[2]}
              </div>
              <div>
                <strong>{Object.keys(obj)[3]}: </strong> {Object.values(obj)[3]}
              </div>
            </CardContent>
            <CardFooter justify='start'>
              <Button variant='primary' onClick={() => handleOpenView(obj)} compact={false}>
                View
              </Button>
              <Button variant='primary' onClick={() => handleEditView(obj)} compact={false}>
                Edit
              </Button>
            </CardFooter>
          </Card>
        )
        )}

      </div>
      <div style={{ margin: '10px' }}>
        <Dialog
          open={openView}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {dialogData && Object.entries(dialogData)?.map(([key, value]) => (
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <div style={{ color: '#00000099', fontSize: '14px' }}>{key}</div>

                  {/* You can place any components or content here */}
                </Grid>
                <Grid item xs={8}>
                  <div style={{ fontSize: '16px' }}>{value}</div>

                  {/* You can place any components or content here */}
                </Grid>
              </Grid>
              // <div key={key}>
              //   <span style={{ color: '#00000099', fontSize: '14px', padding: '10px' }}>{key} </span>

              //   <span style={{ fontSize: '16px', padding: '10px' }}>{value}</span>
              // </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </StyledFusionAixComponentsFxCardV1Wrapper>

  );



};

FusionAixComponentsFxCardV1.defaultProps = {
  icon: '',
  useConfigurableLayout: false
};

FusionAixComponentsFxCardV1.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  useConfigurableLayout: PropTypes.bool
};
