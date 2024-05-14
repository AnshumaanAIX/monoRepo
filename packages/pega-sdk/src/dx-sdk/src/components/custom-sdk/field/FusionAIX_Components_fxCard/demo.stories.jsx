import { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import FusionAixComponentsFxCard from './index.jsx';

export default {
  title: 'FusionAixComponentsFxCard',
  decorators: [withKnobs],
  component: FusionAixComponentsFxCard
};

export const baseFusionAixComponentsFxCard = () => {
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
    label: text('Label', 'Label ok'),
    testId: text('Test id', 'text-12344566'),
    cardContent: text(
      'CardContent',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    ),
    cardFooter: text('CardFooter', 'ok'),
    cardHeader: text('CardHeader', 'Full Card'),
    cardMedia: text('CardMedia', 'https://www.pega.com/sites/default/files/default-og.jpg'),
    justifyContent: text('Justify', 'center'),
    cardWidth: text('Width', '25')
  };

  return (
    <>
      <FusionAixComponentsFxCard {...props} />
    </>
  );
};
