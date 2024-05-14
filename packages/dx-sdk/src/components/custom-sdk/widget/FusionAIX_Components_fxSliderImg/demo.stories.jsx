import { withKnobs } from '@storybook/addon-knobs';

import { caseOpConfig, operatorDetails } from './mock.stories';

import FusionAixComponentsFxSliderImg from './index.tsx';

export default {
  title: 'FusionAixComponentsFxSliderImg',
  decorators: [withKnobs],
  component: FusionAixComponentsFxSliderImg
};

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getUserApi = () => {
  return {
    getOperatorDetails: () => {
      return new Promise(resolve => {
        resolve(operatorDetails);
      });
    }
  };
};

export const BaseFusionAixComponentsFxSliderImg = () => {

  const props = {
    ...caseOpConfig,
    getPConnect: () => {
      return {
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
      <FusionAixComponentsFxSliderImg {...props} />
    </>
  );
};