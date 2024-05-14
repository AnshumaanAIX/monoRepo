import { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import FusionAixComponentsFxUrl from './index.jsx';

export default {
  title: 'FusionAixComponentsFxUrl03',
  decorators: [withKnobs],
  component: FusionAixComponentsFxUrl
};

export const baseFusionAixComponentsFxUrl = () => {
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
    label: text('Label', 'Google link'),
    testId: text('Test id', 'text-12344566'),
    primaryVariant: text('primaryVariant', 'secondary'),
    newlink: text('newlink', 'https://www.google.com'),
    time: text('Refresh Screen With Delay', '2'),
  };

  return (
    <>
      <FusionAixComponentsFxUrl {...props} />
    </>
  );
};
