import { Fragment, memo } from 'react';
import { DateTimeDisplay, Card, CardHeader, CardContent, Flex } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import { Avatar, Link, MenuButton, MetaList, Status, SummaryItem } from '@pega/cosmos-react-core';
import Operator from './Operator';
import StyledFusionAixComponentsFxSummaryItemWrapper from './styles';

export default function FusionAixComponentsFxSummaryItem(props) {

  const {
    getPConnect,
    title,
    label,
    createLabel,
    updateLabel,
    createOperator,
    updateOperator,
    createDateTime,
    updateDateTime,
    resolveLabel,
    resolveOperator,
    resolveDateTime,
    hideLabel,
    defVal
  } = props;


  const [_label, user, dateTimeValue] =
    label === 'Create operator'
      ? [createLabel, createOperator, createDateTime]
      : label === 'Update operator'
        ? [updateLabel, updateOperator, updateDateTime]
        : [resolveLabel, resolveOperator, resolveDateTime];

  return (
    <SummaryItem
      primary='This is the primary info'
      secondary={
        true ? (
          <MetaList
            items={[
              'email@example.com',
              <Status variant='success'>Verified</Status>,
              <>
                Go to{' '}
                <Link href='https://www.pega.com' target='_blank'>
                  Pega.com
                </Link>
              </>
            ]}
          />
        ) : undefined
      }
      visual={
        true ? (
          <Avatar
            size='l'
            name='Random Man'
            imageSrc='https://randomuser.me/api/portraits/men/41.jpg'
          />
        ) : undefined
      }
      actions={
        true ? (
          <MenuButton
            text='Options'
            variant='simple'
            icon='more'
            iconOnly
            menu={{
              items: ['Option Number 1', 'Option Number 2', 'Option Number 3'].map(name => ({
                id: name,
                primary: name
              }))
            }}
          />
        ) : undefined
      }
    />
  );



}

FusionAixComponentsFxSummaryItem.defaultProps = {
  "label": "Create operator",
  "title": "Create operator",
  createLabel: null,
  updateLabel: null,
  createOperator: null,
  updateOperator: null,
  createDateTime: null,
  updateDateTime: null,
  resolveLabel: null,
  resolveOperator: null,
  resolveDateTime: null,
  hideLabel: false,
  defVal: '––'
};

FusionAixComponentsFxSummaryItem.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  label: PropTypes.string,
  createLabel: PropTypes.string,
  updateLabel: PropTypes.string,
  resolveLabel: PropTypes.string,
  createOperator: PropTypes.objectOf(PropTypes.any),
  updateOperator: PropTypes.objectOf(PropTypes.any),
  resolveOperator: PropTypes.objectOf(PropTypes.any),
  createDateTime: PropTypes.string,
  updateDateTime: PropTypes.string,
  resolveDateTime: PropTypes.string,
  hideLabel: PropTypes.bool
};

