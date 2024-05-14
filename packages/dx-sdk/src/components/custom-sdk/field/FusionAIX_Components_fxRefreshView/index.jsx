import PropTypes from 'prop-types';
import { Button } from '@pega/cosmos-react-core';
import RefreshIcon from '@material-ui/icons/Refresh';
import StyledFusionAixComponentsFxRefreshViewWrapper from './styles';
import { getComponentFromMap } from '@pega/react-sdk-components/lib/bridge/helpers/sdk_component_map';

export default function FusionAixComponentsFxRefreshView(props) {
  const { getPConnect, value,viewName, placeholder, disabled, readOnly, required, label, testId } = props;
  const refreshPage = () => {
    const caseKey = getPConnect().getCaseInfo().getKey();
    console.log(caseKey,viewName,"caseKeycaseKeycaseKeycaseKey")
    getPConnect().getActionsApi().refreshCaseView(caseKey, viewName, null, {}); 
  }

  return (
    <StyledFusionAixComponentsFxRefreshViewWrapper>
    <div>
        <Button onClick={refreshPage}>
          <RefreshIcon />
        </Button>
      </div>
    </StyledFusionAixComponentsFxRefreshViewWrapper>
  );
}
