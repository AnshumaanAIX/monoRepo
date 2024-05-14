import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardFooter,
  Image,
  MenuButton
} from '@pega/cosmos-react-core';
import {LabelText} from 'govuk-react';

import StyledFusionAixComponentsFxCardWrapper from './styles';

const FusionAixComponentsFxCard = props => {
  const {

    cardHeader,
    cardContent,
    cardMedia,
    cardFooter,
    justifyContent,
    cardWidth
  } = props;

  if (cardWidth > 100 || cardWidth < 20) {
    return <h1>Please provide width in between 20 to 100 </h1>;
  }

  return (
    <StyledFusionAixComponentsFxCardWrapper
      style={{ width: `${cardWidth == '' ? '100' : cardWidth}rem` }}
    >
      <Card className='card'>
        {cardMedia === '' ? null : (
          <CardMedia>
            <Image src={cardMedia} height='100' alt='Media' />
          </CardMedia>
        )}

        <CardHeader
          actions={
            <MenuButton
              portal
              className='btn'
              variant='simple'
              text='Card actions'
              icon='more'
              iconOnly
              menu={{
                items: [
                  { id: 'action-1', primary: 'Card action 1' },
                  { id: 'action-2', primary: 'Card action 2' },
                  { id: 'action-3', primary: 'Card action 3' }
                ]
              }}
            />
          }
        >
          <LabelText variant='h2'>{cardHeader}</LabelText>
        </CardHeader>
        <CardContent>{cardContent}</CardContent>
        <CardFooter justify={justifyContent}>
          {cardFooter == '' ? null : <LabelText variant='secondary'>{cardFooter}</LabelText>}
        </CardFooter>
      </Card>
    </StyledFusionAixComponentsFxCardWrapper>
  );
};

FusionAixComponentsFxCard.defaultProps = {
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
  fieldMetadata: {},
  additionalProps: {},
  variant: 'inline',
  formatter: '',
  isTableFormatter: false,
  hasSuggestions: false
};

export default FusionAixComponentsFxCard;
