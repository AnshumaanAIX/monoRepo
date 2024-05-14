
import FusionAixComponentsFxQrCode from './index';

export default {
  title: 'Fields/QRCode02',
  argTypes: {
    value: {
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
  component: FusionAixComponentsFxQrCode
};

const setPCore = () => {
  (window).PCore = {
    /* Nothing */
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
              value: 'QRCodeImg'
            };
          },
          getActionsApi: () => {
            return {
              updateFieldValue: (prop, value) => {
                // eslint-disable-next-line no-console
                console.log(`Updating property ${prop} with value: ${value}`);
              }
            };
          }
        };
      }
    };
    return <FusionAixComponentsFxQrCode {...props} />;
  },
  args: {
    label: 'QRCode',
    value: '',
    inputProperty: 'https://www.pega.com',
    helperText: 'Scan with your phone',
    testId: '',
    validatemessage: '',
    readOnly: false,
    hideLabel: false
  }
};
