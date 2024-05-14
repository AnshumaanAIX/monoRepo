import { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import FusionAixComponentsFxLocationAddress from './index.jsx';

export default {
  title: 'FusionAixComponentsFxLocationAddress',
  decorators: [withKnobs],
  component: FusionAixComponentsFxLocationAddress
};

export const baseFusionAixComponentsFxLocationAddress = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState('test value');

  const props = {
    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, value) => {
              setValue(value);
            }
          };
        },
        getStateProps: () => {
          return { value: '.name' };
        }
      };
    },
    value,
    placeholder: text('Placeholder', 'Test placeholder'),
    disabled: boolean('Disabled', false),
    readOnly: boolean('Disabled', false),
    required: boolean('Disabled', false),
    label: text('Label', 'Sample Label'),
    testId: text('Test id', 'text-12344566')
  };

  return (
    <>
      <FusionAixComponentsFxLocationAddress {...props} />
    </>
  );
};
