import React,{ useContext, Fragment } from 'react';
import { Grid, Flex, FieldGroup } from '@pega/cosmos-react-core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import StyledFusionAixComponentsProfileViewWrapper from './styles';

// includes in bundle
import { getAllFields } from './utils';

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsProfileView(props) {


  const { getPConnect, children, template, regionsMetadata = [], label, showLabel, showHighlightedData } = props;
  const [formElms, setFormElms] = useState([]);

  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };
  console.log(children, "children from profile view");

  const numRegions = regionsMetadata.length;

  // Set up highlighted data to pass in return if is set to show, need raw metadata to pass to createComponent
  let highlightedDataArr = [];
  if (showHighlightedData) {
    const { highlightedData = [] } = getPConnect().getRawMetadata().config;
    highlightedDataArr = highlightedData.map((field) => {
      field.config.displayMode = 'STACKED_LARGE_VAL';

      // Mark as status display when using pyStatusWork
      if (field.config.value === '@P .pyStatusWork') {
        field.type = 'TextInput';
        field.config.displayAsStatus = true;
      }

      return getPConnect().createComponent(field);
    });
  }
  useEffect(() => {
    const elms = [];
    const region = children[1] ? children[1].props.getPConnect() : [];
    if (region.getChildren()) {
      region.getChildren().map(child => {
        child.getPConnect().setInheritedProp('readOnly', true);
        elms.push(child.getPConnect().getComponent());
      });
      setFormElms(elms);
    }
  }, [children[0]]);
  console.log(formElms);
  return (
    <StyledFusionAixComponentsProfileViewWrapper>
      <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
        {showHighlightedData && highlightedDataArr.length > 0 && (
          <Grid container={{ cols: 'repeat(${numRegions}, 1fr)', gap: 2, alignItems: 'start', pad: [0, 0, 2, 0] }}
            data-testid={`highlighted-column-count-${numRegions}`}>
            {highlightedDataArr.map((child, i) => (
              <Fragment key={`hf-${i + 1}`}>{child}</Fragment>
            ))}
          </Grid>
        )}
        <Grid container={{ cols: 'repeat(${numRegions}, 1fr)', alignItems: 'start', colGap: 1 }} data-testid={`column-count-${numRegions}`} >
          {children.map((child, i) => (
            <Flex container={{ direction: 'column' }} key={`r-${i + 1}`}>
              {child}
            </Flex>
          ))}
        </Grid>
      </FieldGroup>
    </StyledFusionAixComponentsProfileViewWrapper>
  );

}

FusionAixComponentsProfileView.defaultProps = {
  label: undefined,
  showLabel: true,
  showHighlightedData: false
};

// Since the fields are not part of the 'config' in Details template metadata, they need to be subscribed with additionalprops
const mapStateToProps = (_, ownProps) => {
  const { getPConnect, showLabel, label } = ownProps;
  const Allfields = getAllFields(getPConnect);

  return {
    regionsMetadata: Allfields,
    label,
    showLabel,
    getPConnect
  };
};

FusionAixComponentsProfileView.propTypes = {
  regionsMetadata: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
        label: PropTypes.string
      })
    )
  ).isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
  showHighlightedData: PropTypes.bool
};
