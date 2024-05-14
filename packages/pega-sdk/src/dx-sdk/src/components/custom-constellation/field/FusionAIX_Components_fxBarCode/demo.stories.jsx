import FusionAixComponentsFxBarCode, { BarcodeType } from './index';

export default {
  title: 'Fields/Barcode01',
  argTypes: {
    value: {
      table: {
        disable: true
      }
    },
    format: {
      options: Object.values(BarcodeType),
      control: 'select'
    }
  },
  component: FusionAixComponentsFxBarCode
};

const setPCore = () => {
  (window).PCore = {
    /* Nothing */
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
              value: 'BarCodeImg'
            };
          },
          getActionsApi: () => {
            return {
              updateFieldValue: (prop, value) => {
                // eslint-disable-next-line no-console
                //console.log(`Updating property ${prop} with value: ${value}`);
              }
            };
          }
        };
      }
    };
    return <FusionAixComponentsFxBarCode {...props} />;
  },
  args: {
    label: 'Barcode',
    value: '',
    inputProperty: 'A2345FG721',
    format: BarcodeType.CODE128,
    displayValue: true,
    helperText: 'Product details',
    testId: '',
    validatemessage: '',
    readOnly: false,
    hideLabel: false
  }
};
