import FusionAixComponentsFxCaseReference from './index';

export default {
  title: 'Fields/Case reference02',
  argTypes: {
    fieldMetadata: {
      table: {
        disable: true
      }
    },
    selectionProperty: {
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
  component: FusionAixComponentsFxCaseReference
};

const setPCore = () => {
  (window).PCore = {
    getComponentsRegistry: () => {
      return {
        getLazyComponent: (f) => f
      };
    },
    getEnvironmentInfo: () => {
      return {
        getTimeZone: () => 'local'
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
    }
  };
};

export const Default= {
  render: args => {
    setPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getStateProps: () => {
            return {
              value: 'C-123'
            };
          }
        };
      }
    };
    return <FusionAixComponentsFxCaseReference {...props} />;
  },
  args: {
    value: 'C-123'
  }
};
