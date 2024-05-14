import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { configProps, stateProps } from './mock.stories';

import FusionAixComponentsFxPicklist from './index.tsx';

export default {
  title: 'FusionAixComponentsFxPicklist',
  decorators: [withKnobs],
  component: FusionAixComponentsFxPicklist
};

export const BaseFusionAixComponentsFxPicklist = () => {
  const [value, setValue] = useState(configProps.value);

  const props = {
    value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    datasource: configProps.datasource,
    testId: configProps.testId,
    hasSuggestions: configProps.hasSuggestions,
    listType: configProps.listType,
    getPConnect: () => {
      return {
        getDataObject: () => {
          return undefined;
        },
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: (propName, val) => {
              setValue(val);
            },
            triggerFieldChange: () => {
              return undefined;
            }
          };
        },
        getCaseInfo: () => {
          return {
            getClassName: () => {
              return undefined;
            }
          };
        },
        getLocalizedValue: val => {
          return val;
        },
        getLocaleRuleNameFromKeys: () => {
          return undefined;
        }
      };
    }
  };

  return (
    <>
      <FusionAixComponentsFxPicklist {...props} />
    </>
  );
};

