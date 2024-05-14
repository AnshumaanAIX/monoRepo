
import { withKnobs } from '@storybook/addon-knobs';
import FusionAixComponentsFxPasswordInput from './index';

export default {
  title: 'Fields/Password Input01Constellation',
  decorators: [withKnobs],
  argTypes: {
    fieldMetadata: {
      table: {
        disable: true
      }
    },
    additionalProps: {
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
  component: FusionAixComponentsFxPasswordInput
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
    return <FusionAixComponentsFxPasswordInput {...props} />;
  },
  args: {
    label: 'Password',
    value: 'demo',
    helperText: 'Enter a password with one uppercase letter and one special character',
    testId: 'PasswordID',
    placeholder: '',
    validatemessage: '',
    disabled: false,
    readOnly: false,
    required: false,
    hideLabel: false,
    hasSuggestions: false
  }
};
