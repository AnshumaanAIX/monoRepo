import { useState } from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import FusionAixComponentsFxSummaryList from './index.jsx';

export default {
  title: 'FusionAixComponentsFxSummaryList',
  decorators: [withKnobs],
  component: FusionAixComponentsFxSummaryList
};

export const baseFusionAixComponentsFxSummaryList = () => {
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
    countValue: number('Count value', 8),
    showName: text('Show Name', 'People'),
    loadingaction: boolean('Loading', false),
    secondary: boolean('ShowSecondary', true),
    visual: boolean('ShowVisual', true),
    action: boolean('ShowAction', true),
    noitems: boolean('NoItems', false),
    icon: text('Icon', 'users-solid')
  };

  return (
    <>
      <FusionAixComponentsFxSummaryList {...props} />
    </>
  );
};
