import { useState } from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import FusionAixComponentsFxRating from './index.jsx';

export default {
  title: 'FusionAixComponentsFxRating',
  decorators: [withKnobs],
  component: FusionAixComponentsFxRating
};

export const baseFusionAixComponentsFxRating = () => {
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
    testId: text('Test id', 'text-12344566'),
    maximum1: number('Maximum1', 10),
    rate: number('Rate', '3'),
    meta: number('Meta', '200')
  };

  return (
    <>
      <FusionAixComponentsFxRating {...props} />
    </>
  );
};
