import React, { Fragment, memo } from 'react';
import { Avatar, MenuButton, MetaList, Status, SummaryItem } from '@pega/cosmos-react-core';
import {Link,Tag} from 'govuk-react';
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
              <Tag style={{backgroundColor: "#D1FFBD",color:'#013220'}}>Verified</Tag>,
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
