export const getContext = (getPConnect) => {
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

  export const getReferenceList = (pConn) => {
    let resolvePage = pConn.getComponentConfig().referenceList.replace('@P ', '');
    if (resolvePage.includes('D_')) {
      resolvePage = pConn.resolveDatasourceReference(resolvePage);
      if (resolvePage?.pxResults) {
        resolvePage = resolvePage?.pxResults;
      } else if (resolvePage.startsWith('D_') && !resolvePage.endsWith('.pxResults')) {
        resolvePage = `${resolvePage}.pxResults`;
      }
    }
    console.log(resolvePage,"resolvePage");
    return resolvePage;
  };