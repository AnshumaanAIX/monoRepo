// import { FieldGroup, Grid, Configuration } from '@pega/cosmos-react-core';
// import PropTypes from 'prop-types';
// import StyledFusionAixComponentsFxFormFullWidthWrapper from './styles';

// export default function FusionAixComponentsFxFormFullWidth(props) {
//   const { children, NumCols,heading } = props;

//   let nCols = parseInt(NumCols,10);

//   return (
//     <StyledFusionAixComponentsFxFormFullWidthWrapper>
//     <Configuration>
//       <FieldGroup name={heading}>
//         <Grid
//           container={{
//             cols: `repeat(${nCols}, minmax(0, 1fr))`,
//             gap: 2
//           }}
//         >
//           {children}
//         </Grid>
//       </FieldGroup>
//     </Configuration>
//     </StyledFusionAixComponentsFxFormFullWidthWrapper>
//   );

// }

// FusionAixComponentsFxFormFullWidth.defaultProps = {
//   NumCols: 1,
//   templateOverrideMode: 'USE_TEMPLATE',
//   children: []
// };

// FusionAixComponentsFxFormFullWidth.propTypes = {
//   label: PropTypes.string,
//   getPConnect: PropTypes.func.isRequired,
//   children: PropTypes.arrayOf(PropTypes.node).isRequired,
//   template: PropTypes.string.isRequired
// };
import React from 'react';
import { FieldGroup, Grid, Configuration } from '@pega/cosmos-react-core';

export default function FusionAixComponentsFxFormFullWidth(props
  ) {
  const { heading, NumCols, children } = props;

  const nCols = parseInt(NumCols, 10);

  return (
    <Configuration>
      <FieldGroup name={heading}>
        <Grid
          container={{
            cols: `repeat(${nCols}, minmax(0, 1fr))`,
            gap: 2
          }}
        >
          {children}
        </Grid>
      </FieldGroup>
    </Configuration>
  );
}
