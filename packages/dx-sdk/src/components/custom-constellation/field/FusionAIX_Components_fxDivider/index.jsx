import PropTypes from 'prop-types';
import StyledFusionAixComponentsFxDividerWrapper from './styles';

const FusionAixComponentsFxDivider = props => {
  const { getPConnect, value, disabled, required, label, pixel, divider } = props;


  if (divider === 'none' || divider === undefined) {
    return <h1>Please select required divider</h1>
  }
  if (pixel === 'none' || pixel === undefined) {
    return <h1>Please select required pixel</h1>
  }
  return (
    <StyledFusionAixComponentsFxDividerWrapper>
      <div style={{ borderTop: pixel + divider, borderRadius: pixel }} ></div>
    </StyledFusionAixComponentsFxDividerWrapper>
  );
};

FusionAixComponentsFxDivider.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxDivider.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxDivider;
