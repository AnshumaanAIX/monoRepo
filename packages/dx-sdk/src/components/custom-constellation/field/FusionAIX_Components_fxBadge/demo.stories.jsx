import { useState } from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import FusionAixComponentsFxBadge from './index.jsx';

export default {
  title: 'FusionAixComponentsFxBadge',
  decorators: [withKnobs],
  component: FusionAixComponentsFxBadge
};

export const baseFusionAixComponentsFxBadge = () => {
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
    BadgeType: text('BadgeType', 'Alert'),
    variants: text('variants', 'success')
  };
  return (
    <>
      <FusionAixComponentsFxBadge {...props} />
    </>
  );
};
