import React from 'react';
import { Flex, Button, Configuration } from '@pega/cosmos-react-core';

type ActionableButtonProps = {
  label: string;
  value: string;
  localAction: string;
  getPConnect: any;
};

const FusionAixComponentsFxActionButton = (props: ActionableButtonProps) => {
  const { getPConnect, label, value, localAction } = props;
  if (value && localAction) {
    const LaunchLocalAction = () => {
      const actionsAPI = getPConnect().getActionsApi();
      const openLocalAction = actionsAPI.openLocalAction.bind(actionsAPI);
      openLocalAction(localAction, {
        caseID: value,
        containerName: 'modal',
        type: 'express'
      });
    };
    return (
      <Configuration>
        <Flex container={{ direction: 'row' }}>
          <Button onClick={LaunchLocalAction}>{label}</Button>
        </Flex>
      </Configuration>
    );
  }
  return null;
};

export default FusionAixComponentsFxActionButton;
