import FusionAixComponentsFxMaskedInput from './index';

export default {
  title: 'Fields/Masked Input01',
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
  component: FusionAixComponentsFxMaskedInput
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

const setPConnect = () => {
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
};

const MaskedInputDemo = (inputs) => {
  return {
    render: (args) => {
      setPCore();
      const props = {
        ...args,
        additionalProps: { style: { maxWidth: '80ch' } },
        getPConnect: setPConnect
      };
      return <FusionAixComponentsFxMaskedInput {...props} />;
    },
    args: inputs
  };
};

export const Default = MaskedInputDemo({
  label: 'Zip Code',
  mask: '00000-0000',
  value: '',
  helperText: '#####-####',
  testId: 'maskedinput',
  placeholder: '',
  validatemessage: '',
  disabled: false,
  readOnly: false,
  required: false,
  hideLabel: false,
  hasSuggestions: false
});

export const IBAN = MaskedInputDemo({
  label: 'IBAN (International Bank Account Number)',
  mask: 'AA00 0000 0000 0000 0000 0000 A00',
  helperText: '#### #### #### #### #### #### ###'
});

export const CreditCard = MaskedInputDemo({
  label: 'Credit Card number',
  mask: '0000 0000 0000 0000'
});

export const IPAddress = MaskedInputDemo({
  label: 'IP Address',
  mask: '0[00].0[00].0[00].0[00]',
  helperText: '(0-255).(0-255).(0-255).(0-255)'
});

export const ZipCode = MaskedInputDemo({
  label: 'Zip Code (extended code optional)',
  mask: '00000[-0000]',
  helperText: '#####-####'
});

export const SSN = MaskedInputDemo({
  label: 'SSN',
  mask: '000 00 0000',
  helperText: '### ## ####'
});