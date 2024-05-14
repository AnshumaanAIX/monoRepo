import React,{ useState } from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import FusionAixComponentsFxPasswordOtp from './index.jsx';

export default {
  title: 'FusionAixComponentsFxPasswordOtp',
  decorators: [withKnobs],
  component: FusionAixComponentsFxPasswordOtp
};

export const baseFusionAixComponentsFxPasswordOtp = () => {
  const [value, setValue] = useState('');

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
    placeholder: text('Placeholder', 'Test'),
    disabled: boolean('Disabled', false),
    readOnly: boolean('Disabled', false),
    required: boolean('Disabled', false),
    label: text('Label', 'Password'),
    testId: text('Test id', 'text-12344566'),
    otpLength: number('otpLength', 6),
    fieldType: text('fieldType', 'Password'),
  };

  return (
    <>
      <FusionAixComponentsFxPasswordOtp {...props} />
    </>
  );
};
