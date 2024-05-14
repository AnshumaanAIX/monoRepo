import { useState } from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import FusionAixComponentsFxSlider from './index.jsx';

export default {
  title: 'FusionAixComponentsFxSlider',
  decorators: [withKnobs],
  component: FusionAixComponentsFxSlider
};

export const baseFusionAixComponentsFxSlider = () => {
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
    label: text('Label', 'Slider input'),
    testId: text('Test id', 'text-12344566'),
    helper: text('Helper Text', 'Pick a value'),
    ticks: text('Ticks', ''),
    defaultvalue: text('value', '7'),
    max: text('Max', '20'),
    min: text('Min', '0'),
    step: text('Step', '1'),
    orientation: text('Orientation', 'vertical'),
    status: text('Status', 'success'),
    progress: boolean('Progress', true),
    input: boolean('Input', true),
    hidden: boolean('Hidden', false),
    preview: boolean('preview', false)
  };

  return (
    <>
      <FusionAixComponentsFxSlider {...props} />
    </>
  );
};
