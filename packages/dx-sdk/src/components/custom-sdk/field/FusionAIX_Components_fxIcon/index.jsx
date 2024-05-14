import React from 'react';
import { Icon, registerIcon } from '@pega/cosmos-react-core';
import * as amazon from '@pega/cosmos-react-core/lib/components/Icon/icons/amazon.icon';
import * as atom from '@pega/cosmos-react-core/lib/components/Icon/icons/atom.icon';
import * as infinity from '@pega/cosmos-react-core/lib/components/Icon/icons/infinity.icon';
import * as youtube from '@pega/cosmos-react-core/lib/components/Icon/icons/youtube.icon';
import * as google from '@pega/cosmos-react-core/lib/components/Icon/icons/google.icon';

import StyledFusionAixComponentsFxIconWrapper from './styles';

const FusionAixComponentsFxIcon = props => {
  const { getPConnect, disabled, required, label, fxIcon } = props;

  registerIcon(amazon);
  registerIcon(atom);
  registerIcon(infinity);
  registerIcon(youtube);
  registerIcon(google);


  let displayIcon;

  switch (fxIcon) {
    case 'amazon':
      displayIcon = 'amazon'
      break;
    case 'react':
      displayIcon = 'atom'
      break;
    case 'google':
      displayIcon = 'google'
      break;
    case 'youtube':
      displayIcon = 'youtube'
      break;
    default:
      return <h1>Please select required Icon</h1>

  }


  return (
    <StyledFusionAixComponentsFxIconWrapper>
      <Icon
        style={{ height: '5rem', width: '5rem' }}
        name={displayIcon}
        role='img'
      />
    </StyledFusionAixComponentsFxIconWrapper>
  );
};

FusionAixComponentsFxIcon.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

export default FusionAixComponentsFxIcon;
