import { useState } from 'react';

import { useMockListData } from './list';

import { Modal, SummaryList, useModalManager } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxSummaryListWrapper from './styles';

export default function FusionAixComponentsFxSummaryList(props) {
  const {
    getPConnect,
    countValue,
    showName,
    noitemtext,
    icon,
    loadingaction,
    secondary,
    visual,
    action,
    noitems
  } = props;

  const { create: createModal } = useModalManager();
  const [loading, setLoading] = useState(true);
  const [items] = useMockListData(
    () => {
      setLoading(false);
    },
    { count: countValue }
  );
  const itemsToRender = items.map(item => {
    return {
      ...item,
      secondary: secondary ? item.secondary : undefined,
      visual: visual ? item.visual : undefined,
      actions: action
        ? ['Action 1', 'Action 2', 'Action 3'].map(text => ({
            text,
            id: text
          }))
        : undefined
    };
  });

  return (
    <StyledFusionAixComponentsFxSummaryListWrapper>
      <SummaryList
        name={showName}
        icon={icon}
        count={loadingaction || loading ? undefined : countValue}
        items={noitems ? [] : itemsToRender}
        loading={loadingaction || loading}
        noItemsText={noitemtext}
        actions={[
          {
            text: 'Add',
            id: `${showName}:addNew`,
            icon: 'plus',
            onClick() {
              createModal(() => {
                return (
                  <Modal heading={`Add new ${showName}`}>
                    {`Content for adding new ${showName} goes here…`}
                  </Modal>
                );
              });
            }
          }
        ]}
      />
    </StyledFusionAixComponentsFxSummaryListWrapper>
  );
}

FusionAixComponentsFxSummaryList.defaultProps = {
  label: 'Create operator',
  title: 'Create operator',
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

FusionAixComponentsFxSummaryList.propTypes = {
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
