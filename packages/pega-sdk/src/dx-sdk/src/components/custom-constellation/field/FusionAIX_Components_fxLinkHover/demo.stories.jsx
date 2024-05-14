import { withKnobs } from '@storybook/addon-knobs';

import FusionAixComponentsFxLinkHover from './index.jsx';
import { stateProps, configProps } from './mock.stories';

export default {
  title: 'FusionAixComponentsFxLinkHover',
  decorators: [withKnobs],
  component: FusionAixComponentsFxLinkHover
};

export const baseFusionAixComponentsFxLinkHover = () => {

  const props = {
    value: configProps.value,
    placeholder: configProps.placeholder,
    label: configProps.label,
    helperText: configProps.helperText,
    testId: configProps.testId,
    hasSuggestions: configProps.hasSuggestions,

    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <FusionAixComponentsFxLinkHover {...props} />
    </>
  );
};
