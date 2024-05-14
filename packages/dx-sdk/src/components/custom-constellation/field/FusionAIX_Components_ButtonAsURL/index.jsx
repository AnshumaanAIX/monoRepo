import React from 'react';
import PropTypes from 'prop-types';
import { Configuration, registerIcon, Button, Icon, Image, Link } from '@pega/cosmos-react-core';
import * as caretRight from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-right.icon';

import StyledFusionAixComponentsButtonAsUrlWrapper from './styles';

const FusionAixComponentsButtonAsUrl = props => {
  const { getPConnect, value, displayURL, alignment, link } = props;

  registerIcon(caretRight);

  if (displayURL === 'None' || undefined) {
    return '';
  } else {
    return (
      <StyledFusionAixComponentsButtonAsUrlWrapper alignment={alignment}>
        {displayURL === 'Button' ? (
          <Button variant='primary' href={value} target='_blank' className='alignment'>
            Check{' '}
            <Icon
              style={{ height: '1rem', width: '1rem' }}
              name='caret-right'
              aria-label='caret-right'
            />
          </Button>
        ) : (
          <>{link ?
            <Link href={link} variant='link' target='_blank' >
              <Image className='img-content' src={value} alt='' />
            </Link> : <Image className='img-content' src={value} alt='' />
          }
          </>


        )}
      </StyledFusionAixComponentsButtonAsUrlWrapper>
    );
  }


};

FusionAixComponentsButtonAsUrl.defaultProps = {
  value: '',
  placeholder: '',
  validatemessage: '',
  helperText: '',
  hideLabel: false,
  disabled: false,
  readOnly: false,
  required: false,
  testId: null,
  displayMode: null,
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  displayURL: 'defaultURL',
  widthSel: 'defaultWidth',
  customWidth: null,
  altText: 'constant',
  altTextOfImage: '',
  propaltTextOfImage: '',
  urlLabel: '',
  propUrlLabel: '',
  urlLabelSelection: 'constant',
  tabledisplayURL: 'link',
  hasSuggestions: false
};

FusionAixComponentsButtonAsUrl.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  displayMode: PropTypes.string,
  additionalProps: PropTypes.objectOf(PropTypes.any),
  variant: PropTypes.string,
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  displayURL: PropTypes.string,
  widthSel: PropTypes.string,
  customWidth: PropTypes.number,
  altText: PropTypes.string,
  altTextOfImage: PropTypes.string,
  propaltTextOfImage: PropTypes.string,
  urlLabel: PropTypes.string,
  propUrlLabel: PropTypes.string,
  urlLabelSelection: PropTypes.string,
  tabledisplayURL: PropTypes.string,
  hasSuggestions: PropTypes.bool
};

export default FusionAixComponentsButtonAsUrl;
