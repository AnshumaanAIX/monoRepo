
type loadDetailsProps = {
  id: string;
  classname: string;
  detailsDataPage: string;
  detailsViewName: string;
  getPConnect: any;
};
export const loadDetails = async (props: loadDetailsProps) => {
  const { id, classname, detailsDataPage, detailsViewName, getPConnect } = props;
  let myElem;
  console.log('props1:',props)
  console.log('loadDetails:',loadDetails)
  await (window as any).PCore.getDataApiUtils()
    .getDataObjectView(detailsDataPage,  { pyID: id }, detailsViewName,)
    .then(async (res: any) => {
      const { fetchViewResources, updateViewResources } = (window as any).PCore.getViewResources();
      await updateViewResources(res.data);
      const transientItemID = getPConnect()
        .getContainerManager()
        .addTransientItem({
          id: `${detailsViewName}${id}`,
          data: {}
        });
      getPConnect().getContainerManager().updateTransientData({
        transientItemID,
        data: res.data.data.dataInfo
      });
      const messageConfig = {
        meta: fetchViewResources(detailsViewName, getPConnect(), classname),
        options: {
          contextName: transientItemID,
          context: transientItemID,
          pageReference: 'content'
        }
      };
      messageConfig.meta.config.showLabel = false;
      messageConfig.meta.config.pyID = id;
      const c11nEnv = (window as any).PCore.createPConnect(messageConfig);

      myElem = c11nEnv.getPConnect().createComponent(messageConfig.meta);
    });
    console.log('myElem:',myElem)
  return myElem;
};
console.log('loadDetails:',loadDetails)
type updateGroupValueProps = {
  groupValue: string;
  groupProperty: string;
  columns: any;
  setColumns: any;
  task: any;
  getPConnect: any;
};

export const updateGroupValue = (props: updateGroupValueProps) => {
  const { groupValue, groupProperty, columns, setColumns, task, getPConnect } = props;

  const context = getPConnect().getContextName();
  (window as any).PCore.getDataApiUtils()
    .getCaseEditLock(task.insKey, context)
    .then((response: any) => {
      const payload: any = {};
      const content: any = {};
      content[groupProperty] = groupValue;
      payload[task.insKey] = content;

      (window as any).PCore.getDataApiUtils()
        .updateCaseEditFieldsData(task.insKey, payload, response.headers.etag, context)
        .then(() => {
          task.groupValue = groupValue;
          const newSourceTaskList = Array.from(columns[groupValue].taskList);
          const newtmpColumns = {
            ...columns,
            [groupValue]: {
              ...columns[groupValue],
              taskList: newSourceTaskList
            }
          };
          setColumns(newtmpColumns);
        });
    });
};
