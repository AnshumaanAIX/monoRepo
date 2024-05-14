import PropTypes from 'prop-types';
import { Button } from '@pega/cosmos-react-core';
import RefreshIcon from '@material-ui/icons/Refresh';

import StyledFusionAixComponentsFxRefreshViewWrapper from './styles';
const FusionAixComponentsFxRefreshView = props => {
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


};


FusionAixComponentsFxRefreshView.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxRefreshView.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxRefreshView;
