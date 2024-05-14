import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardFooter,
  Image,
  MenuButton,
  Text
} from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxCardWrapper from './styles';

const FusionAixComponentsFxCard = props => {
  const {
    getPConnect,
    value,
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
          <Text variant='h2'>{cardHeader}</Text>
        </CardHeader>
        <CardContent>{cardContent}</CardContent>
        <CardFooter justify={justifyContent}>
          {cardFooter == '' ? null : <Text variant='secondary'>{cardFooter}</Text>}
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

FusionAixComponentsFxCard.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  getPConnect: PropTypes.func.isRequired,
  validatemessage: PropTypes.string,
  displayMode: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string,
  fieldMetadata: PropTypes.objectOf(PropTypes.any),
  additionalProps: PropTypes.objectOf(PropTypes.any),
  variant: PropTypes.string,
  formatter: PropTypes.string,
  isTableFormatter: PropTypes.bool,
  hasSuggestions: PropTypes.bool
};

export default FusionAixComponentsFxCard;
