
import React, { useState, useEffect } from 'react';
import {
  FieldGroup,
  FieldValueList,
  RadioButtonGroup,
  Progress,
  RadioButton,
  Text,
  createUID,
  Configuration
} from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxCompareTableLayoutWrapper from './styles';

import getAllFields from './utils';

export default function FusionAixComponentsFxCompareTableLayout(props) {
  const { displayFormat, heading, selectionProperty, currencyFormat, getPConnect } = props;
  const [numCols, setNumCols] = useState(0);
  const [numFields, setNumFields] = useState(0);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState([]);

  const metadata = getPConnect().getRawMetadata();

  const selectObject = (ID, index) => {
    if (metadata.config.selectionProperty) {
      const prop = metadata.config.selectionProperty.replace('@P ', '');
      getPConnect().setValue(prop, ID);
    }
    const sel = [];
    for (let i = 0; i < numCols; i += 1) {
      sel.push(i === index);
    }
    setSelection(sel);
  };

  const genField = (componentType, val, key) => {
    const field = {
      type: componentType,
      config: {
        text: `${val}`,
        value: `${val}`,
        label: '',
        displayMode: 'DISPLAY_ONLY'
      }
    };
    if (componentType === 'URL') {
      field.config.displayAs = 'Image';
    }
    if (componentType === 'Currency') {
      if (currencyFormat === 'parentheses') {
        field.config.negative = 'parentheses';
      } else {
        field.config.notation = currencyFormat;
      }
    }
    return <td key={key}>{getPConnect().createComponent(field)}</td>;
  };

  useEffect(() => {
    const tmpFields = getAllFields(getPConnect);
    if (tmpFields && tmpFields[0] && tmpFields[0].value) {
      setNumCols(tmpFields[0].value.length);
      tmpFields.forEach((child) => {
        if (
          child.componentType &&
          !(window).PCore.getComponentsRegistry().getLazyComponent(child.componentType)
        ) {
          (window).PCore.getAssetLoader()
            .getLoader('component-loader')([child.componentType])
            .then(() => {
              setNumFields(prevCount => prevCount + 1);
            });
        } else {
          setNumFields(prevCount => prevCount + 1);
        }
        if (typeof selectionProperty !== 'undefined' && child.label === 'ID') {
          child.value.forEach((val, index) => {
            if (val === selectionProperty) {
              const sel = [];
              for (let i = 0; i < child.value.length; i += 1) {
                sel.push(i === index);
              }
              setSelection(sel);
            }
          });
        }
      });
      setFields(tmpFields);
    }
  }, [displayFormat, currencyFormat, selectionProperty, getPConnect]);

  useEffect(() => {
    if (fields && fields.length > 0 && numFields === fields.length) {
      setLoading(false);
    }
  }, [numFields, fields]);

  if (loading) {
    return <Progress placement='local' message='Loading content...' />;
  }

  if (displayFormat === 'radio-button-card') {
    return (
      <Configuration>
        <StyledFusionAixComponentsFxCompareTableLayoutWrapper displayFormat={displayFormat}>
          <RadioButtonGroup variant='card' label={heading} inline>
            {fields[0].value.map((val, i) => {
              const fvl = [];
              let objectId = '';
              fields.forEach((child, j) => {
                if (j > 0) {
                  if (child.label === 'ID') {
                    objectId = child.value[i];
                  } else {
                    fvl.push({
                      id: child.label,
                      name: child.label,
                      value:
                        child.value && child.value.length >= i
                          ? genField(child.componentType, child.value[i], `card-${i}-${j}`)
                          : ''
                    });
                  }
                }
              });
              return (
                <RadioButton
                  label={
                    <FieldGroup name={val} headingTag='h3'>
                      <FieldValueList fields={fvl} />
                    </FieldGroup>
                  }
                  key={`rb-${i}`}
                  id={val}
                  onChange={() => selectObject(objectId, i)}
                  checked={selection.length >= i ? selection[i] : false}
                />
              );
            })}
          </RadioButtonGroup>
        </StyledFusionAixComponentsFxCompareTableLayoutWrapper>
      </Configuration>
    );
  }

  const tableId = createUID();
  return (
    <Configuration>
      <StyledFusionAixComponentsFxCompareTableLayoutWrapper displayFormat={displayFormat}>
        <table>
          <caption>
            <Text variant='h3'>{heading}</Text>
          </caption>
          <thead>
            <tr>
              <th>Name</th>
              {fields[0].value.map((val, idx) => {
                const field = {
                  type: 'Text',
                  config: {
                    text: val,
                    displayMode: 'DISPLAY_ONLY'
                  }
                };
                return (
                  <th scope='col' key={`${tableId}-col-${idx}`} id={`${tableId}-col-${idx}`}>
                    {getPConnect().createComponent(field)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {fields.map((child, i) => {
              if (i > 0) {
                if (child.heading) {
                  return (
                    <tr key={`total-cat-${i}`} className={`total cat-${child.category}`}>
                      <th colSpan={numCols + 1}>{child.heading}</th>
                    </tr>
                  );
                }
                /* Show a selection with radioButton if the label is called ID and the selectionProperty is provided */
                if (
                  child.label === 'ID' &&
                  typeof selectionProperty !== 'undefined' &&
                  metadata.config.selectionProperty
                )
                  return (
                    <tr key={`reg-row-${i}`} className='selection'>
                      <th>Selection</th>
                      {child.value &&
                        child.value.map((val, j) => {
                          return (
                            <td key={`${tableId}-cell-${i}-${j}`}>
                              <RadioButton
                                id={`${tableId}-radio-${j}`}
                                aria-labelledby={`${tableId}-radio-${j} ${tableId}-col-${j}`}
                                variant='card'
                                label='Select'
                                checked={selection.length >= j ? selection[j] : false}
                                onChange={() => selectObject(val, j)}
                              />
                            </td>
                          );
                        })}
                    </tr>
                  );
                return (
                  <tr key={`reg-row-${i}`}>
                    <th scope='row'>{child.label}</th>
                    {child.value &&
                      child.value.map((val, j) => {
                        return genField(child.componentType, val, `${tableId}-row-${i}-${j}`);
                      })}
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </StyledFusionAixComponentsFxCompareTableLayoutWrapper>
    </Configuration>
  );
}
