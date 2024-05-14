
import FusionAixComponentsFxSignatureCapture from './index';

export default {
  title: 'Fields/Signature Capture02',
  argTypes: {
    value: {
      table: {
        disable: true
      }
    },
    displayMode: {
      table: {
        disable: true
      }
    },
    variant: {
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
  component: FusionAixComponentsFxSignatureCapture
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

// type Story = StoryObj<typeof FusionAixComponentsFxSignatureCapture>;

export const Default = {
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
              openWorkByHandle: () => {
                /* nothing */
              },
              createWork: () => {
                /* nothing */
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
    return <FusionAixComponentsFxSignatureCapture {...props} />;
  },
  args: {
    label: 'Signature',
    value: '',
    helperText: 'Sign the document',
    testId: '',
    validatemessage: '',
    disabled: false,
    readOnly: false,
    required: false,
    hideLabel: false
  }
};
