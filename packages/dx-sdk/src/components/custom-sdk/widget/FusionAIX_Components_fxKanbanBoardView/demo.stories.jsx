import { FieldValueList, DateTimeDisplay } from '@pega/cosmos-react-core';
import FusionAixComponentsFxKanBadBoardView from './index';

export default {
  title: 'Widgets/Kanban board04',
  argTypes: {
    detailsDataPage: {
      table: {
        disable: true
      }
    },
    detailsViewName: {
      table: {
        disable: true
      }
    },
    dataPage: {
      table: {
        disable: true
      }
    },
    getPConnect: {
      table: {
        disable: true
      }
    }
  },
  component: FusionAixComponentsFxKanBadBoardView
};

const tasks = {
  'A-1001': {
    pyStatusWork: 'New',
    pyLabel: 'Complete the assessment',
    pyDescription: 'Need to review and complete the work',
    pyDueDate: '2024-03-01T00:00:00.000Z',
    pxObjClass: 'Work-UserStory',
    pxCreateOpName: 'Marc Doe',
    pyID: 'A-1001',
    pzInsKey: 'Task A-1001'
  },
  'A-1002': {
    pyStatusWork: 'Open',
    pyLabel: 'Code development of feature #1',
    pyDescription: 'Complete code and unit test',
    pyDueDate: '2024-02-01T00:00:00.000Z',
    pxObjClass: 'Work-UserStory',
    pxCreateOpName: 'Sue Lee',
    pyID: 'A-1002',
    pzInsKey: 'Task A-1002'
  },
  'A-1003': {
    pyStatusWork: 'Open',
    pyLabel: 'Integration Testing',
    pyDescription: 'Testing against application A',
    pyDueDate: '2024-02-20T00:00:00.000Z',
    pxObjClass: 'Work-UserStory',
    pxCreateOpName: 'Joe Smith',
    pyID: 'A-1003',
    pzInsKey: 'Task A-1003'
  },
  'A-1004': {
    pyStatusWork: 'Pending-Review',
    pyLabel: 'Code Review',
    pyDescription: 'Review the code',
    pyDueDate: '2024-03-01T00:00:00.000Z',
    pxObjClass: 'Work-UserStory',
    pxCreateOpName: 'Sue Lee',
    pyID: 'A-1004',
    pzInsKey: 'Task A-1004'
  },
  'A-1005': {
    pyStatusWork: 'Open',
    pyLabel: 'Design',
    pyDescription: 'Finalize the design',
    pyDueDate: '2024-01-11T00:00:00.000Z',
    pxObjClass: 'Work-UserStory',
    pxCreateOpName: 'Marc Doe',
    pyID: 'A-1005',
    pzInsKey: 'Task A-1005'
  }
};

const setPCore = () => {
  (window).PCore = {
    createPConnect: () => ({
      getPConnect: () => ({
        createComponent: (meta) => {
          const id = meta.config.pyID;
          const fields = [
            { name: 'CaseID', value: id },
            { name: 'Description', value: tasks[id].pyDescription },
            { name: 'Assigned To', value: tasks[id].pxCreateOpName },
            {
              name: 'Due date',
              value: <DateTimeDisplay variant='date' value={tasks[id].pyDueDate} />
            }
          ];
          return <FieldValueList variant='stacked' fields={fields} />;
        }
      })
    }),
    getComponentsRegistry: () => {
      return {
        getLazyComponent: (f) => f
      };
    },
    getViewResources: () => {
      return {
        fetchViewResources: () => {
          return {
            config: {
              showLabel: true
            }
          };
        },
        updateViewResources: () => {}
      };
    },
    getEnvironmentInfo: () => {
      return {
        getTimeZone: () => 'local'
      };
    },
    getEvents: () => {
      return {
        getCaseEvent: () => {
          return {
            ASSIGNMENT_SUBMISSION: 'ASSIGNMENT_SUBMISSION'
          };
        }
      };
    },
    getPubSubUtils: () => {
      return {
        subscribe: () => {
          /* nothing */
        },
        unsubscribe: () => {
          /* nothing */
        }
      };
    },
    getSemanticUrlUtils: () => {
      return {
        getResolvedSemanticURL: () => {
          return undefined;
        },
        getActions: () => {
          return {
            ACTION_OPENWORKBYHANDLE: 'openWorkByHandle'
          };
        }
      };
    },
    getDataApiUtils: () => {
      return {
        getCaseEditLock: () => {
          return Promise.resolve({
            headers: {
              etag: 'xxx'
            }
          });
        },
        updateCaseEditFieldsData: () => {
          return Promise.resolve();
        },
        getDataObjectView: () => {
          return Promise.resolve({
            data: {
              data: {
                content: {
                  pyStatusWork: 'New'
                }
              }
            }
          });
        },
        getData: () => {
          return Promise.resolve({
            data: {
              data: Array.from(Object.entries(tasks).map((val) => val[1]))
            }
          });
        }
      };
    }
  };
};

export const Default = {
  render: args => {
    setPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getContextName: () => 'primary',
          getContainerManager: () => ({
            addTransientItem: () => {},
            updateTransientData: () => {}
          }),
          getActionsApi: () => {
            return {
              openWorkByHandle: () => {
                /* nothing */
              },
              openLocalAction: (id) => {
                alert(`Opening local action for case:${id}`);
              },
              createWork: (className) => {
                alert(`Create case type with className:${className}`);
              },
              updateFieldValue: () => {
                /* nothing */
              },
              triggerFieldChange: () => {
                /* nothing */
              },
              showCasePreview: () => {
                /* nothing */
              }
            };
          },
          ignoreSuggestion: () => {
            /* nothing */
          },
          acceptSuggestion: () => {
            /* nothing */
          },
          setInheritedProps: () => {
            /* nothing */
          },
          resolveConfigProps: () => {
            /* nothing */
          }
        };
      }
    };
    return <FusionAixComponentsFxKanBadBoardView {...props} />;
  },
  args: {
    heading: 'Kanban board',
    createClassname: 'Work-UserStory',
    dataPage: '',
    height: '30rem',
    groups: 'New,Open,Pending-Review,Resolved-Completed',
    groupProperty: 'pyStatusWork',
    detailsDataPage: '',
    detailsViewName: ''
  }
};
