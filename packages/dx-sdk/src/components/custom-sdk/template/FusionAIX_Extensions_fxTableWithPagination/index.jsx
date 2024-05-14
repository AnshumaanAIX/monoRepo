import React, { useState, useEffect } from 'react';
import PropTypes, { element } from 'prop-types';
import StyledFusionAixExtensionsFxTableWithPaginationWrapper from './styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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

const useStyles = makeStyles((/* theme */) => ({
  label: {
    margin: '8px'
  },
  header: {
    background: '#f5f5f5',
    textTransform: 'capitalize'
  },
  tableCell: {
    borderRight: '1px solid lightgray',
    padding: '8px'
  },

}));


export default function FusionAixExtensionsFxTableWithPagination(props) {
  const classes = useStyles();
  const { children, getPConnect, pageSize } = props;
  let referencelistObject;
  const [tableView, setTableView] = useState([]);
  const [referencedata, setreferencedata] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [elements, setElementsData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [sortedData,setSortedData] = useState([]);
  const [searchResults,setSearchResults]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');




  const pConn = getPConnect();
  const {
    CONTAINER_TYPE: { MULTIPLE },
    PUB_SUB_EVENTS: { EVENT_SHOW_CANCEL_ALERT }
  } = PCore.getConstants();

  const context = getPConnect().getContextName();
  const refView = children[0].props
    .getPConnect()
    ?.getChildren()[0]
    .getPConnect()
    .getReferencedViewPConnect()
    .getPConnect()
    .getRawMetadata();

  useEffect(() => {
    const dataObjectClass = refView?.config?.contextClass;
    const dataObjectTokens = dataObjectClass.split('-');
    const dataObjectName = dataObjectTokens[dataObjectTokens.length - 1];
    const listDataPage = `D_${dataObjectName}`;
    const dataPageKeys = PCore.getDataTypeUtils().getDataPageKeys(listDataPage) || [];

    if (dataPageKeys.length === 0) {
      PCore.getRestClient()
        .invokeRestApi('showView', {
          queryPayload: {
            page: `${dataObjectName}`,
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
      console.log(evvt, 'evvt');
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
    const { contextName, referenceListStr, pageReferenceForRows, viewName } =
      getContext(getPConnect);
    referencelistObject = referenceListStr;
    const context = getPConnect().getContextName();
    const rawFields =
      loadview?.props?.getPConnect()?.meta.config?.children?.[0]?.children ||
      loadview?.props?.getPConnect()?.presets?.[0].children?.[0]?.children;
    const reference = referenceList.map((reference, index) => {
      return { ...reference, id: index };
    });
    setreferencedata(reference);
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
      eleData.push(data);
    });
    setElementsData(eleData);
  };

  useEffect(() => {
    if (referencedata.length > 0 && pageSize) {
      let pageNum = referencedata.length / pageSize;
      if (!Number.isInteger(pageNum)) {
        const num = Math.ceil(pageNum);
        setPageNumber(num);
      }
      else {
        setPageNumber(pageNum);

      }
      setEndIndex(pageSize);
    }
  }, [elements]);

  const onPagingClick = (event) => {
    const btnValue = event.target.innerHTML;
    setFlag(true);
    if (btnValue === '1') {
      setStartIndex(0);
      setEndIndex(pageSize);
    }
    else {
      setStartIndex(endIndex);
      setEndIndex(endIndex + pageSize);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleRequestSort = (event, property, index) => {
    const sortedData = elements.sort((a, b) => {
       const aValue = a[index].props.value.toLowerCase();
       const bValue = b[index].props.value.toLowerCase();
       return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
     });
     const isAsc = order === 'asc';
     setOrder(isAsc ? 'desc' : 'asc');
     setOrderBy(property);
   };



  const createSortHandler = function(property,index) {
    return function(event) {
        handleRequestSort(event, property,index);
    };
};

const searchArray = (term) => {
  if (!term.trim()) {
    setSearchResults([]);
    return;
  }

  const results = [];
  elements.forEach((innerArray) => {
    innerArray.forEach((item) => {
      if (
        item.props.value &&
        typeof item.props.value === 'number' ? item.props.value === parseInt(term,10)
        :item.props.value.toLowerCase().includes(term.toLowerCase())
      ) {
        results.push(innerArray);
      }
    });
  });
  setSearchResults(results);
};


const handleInputChange = (event) => {
  const term = event.target.value;
  setSearchTerm(term);
  searchArray(term);
};


  return (
    <StyledFusionAixExtensionsFxTableWithPaginationWrapper>
      <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        size="small"
        style={{margin:'10px 0px'}}
        onChange={handleInputChange}
      />
        <TableContainer component={Paper} style={{ margin: '4px 0px' }}>
          <Table>
            <TableHead className={classes.header}>
              <TableRow>
                {elements[0]?.map((item,index) => {
                  return <TableCell className={classes.tableCell}>
                     <div>
                      <TableSortLabel
                        active={orderBy === item?.props?.label}
                        direction={orderBy === item?.props?.label ? order : 'asc'}
                        onClick={createSortHandler(item?.props?.label,index)}
                      >
                        {item?.props?.label}
                      </TableSortLabel>
                    </div>
                  </TableCell>;
                })
                }
              </TableRow>
            </TableHead>
            <TableBody>
            {searchResults.length > 0 ? searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, id)=> (
                <TableRow key={id}>
                {element.map((row, id) => (
                  <TableCell className={classes.tableCell} key={id}>{row?.props?.value}</TableCell>
                ))}
              </TableRow>
              ))
              :
              elements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, id) => (
                <TableRow key={id}>
                  {element.map((row, id) => (
                    <TableCell className={classes.tableCell} key={id}>{row?.props?.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[pageSize, pageSize * 2]}
            component="div"
            count={referencedata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </StyledFusionAixExtensionsFxTableWithPaginationWrapper >
  );
}

FusionAixExtensionsFxTableWithPagination.defaultProps = {
  icon: '',
  useConfigurableLayout: false
};

FusionAixExtensionsFxTableWithPagination.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  useConfigurableLayout: PropTypes.bool
};
