import FusionAixComponentsFxActionButton from './index';

export default {
  title: 'Fields/ActionButton02',
  argTypes: {
    getPConnect: {
      table: {
        disable: true
      }
    }
  },
  component: FusionAixComponentsFxActionButton
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
          },
          getActionsApi: () => {
            return {
              openLocalAction: {
                bind: () => {
                  return (name, options) => {
                    // eslint-disable-next-line no-alert
                    alert(`Launch local action ${name} for ${options.caseID}`);
                  };
                }
              }
            };
          }
        };
      }
    };
    return <FusionAixComponentsFxActionButton {...props} />;
  },
  args: {
    label: 'Launch',
    localAction: 'pyEditDetails',
    value: 'Work-Case C-123'
  }
};
