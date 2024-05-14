import { useState } from 'react';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';

import FusionAixComponentsFxBanner from './index.jsx';

export default {
  title: 'FusionAixComponentsFxBanner',
  decorators: [withKnobs],
  component: FusionAixComponentsFxBanner
};

export const baseFusionAixComponentsFxBanner = () => {
  const [value, setValue] = useState('test value');
  const messagesToRender = ['Jagadeesh', ' ', 'Varma'];

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
    testId: text('Test id', 'text-12344566'),
    messages: array('messages', messagesToRender),
    variants: text('variants', 'info')
  };

  return (
    <>
      <FusionAixComponentsFxBanner {...props} />
    </>
  );
};
