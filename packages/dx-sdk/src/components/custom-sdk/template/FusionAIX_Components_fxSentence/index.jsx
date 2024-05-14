import React, {  useState, useEffect } from 'react';
import { Text, Link } from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxSentenceWrapper from './styles';


export default function FusionAixComponentsFxSentence(props) {
  const {
    children,
    Alignment,
    showHeader
  } = props;

  const [sentenceElements, setSentenceElements] = useState([]);
  const propValues = [];

  if (children[0] && children[0].props.getPConnect().getChildren()) {
    children[0].props
      .getPConnect()
      .getChildren()
      .map(child => {
        const pconn = child.getPConnect();
        const compName = pconn.getComponentName();
        const propsChild = pconn.getConfigProps();
        if([
            'TextInput',
            'Email',
            'TextArea',
            'Currency',
            'Decimal',
            'Percentage',
            'Integer',
            'Phone',
            'URL'
          ].includes(compName)
        ) {

          if (propsChild.value && compName) {
            propValues.push({
              name: compName,
              value: propsChild.value
            });
          }
        }
      });
  }
  useEffect(() => {
    setSentenceElements(propValues);
  }, []);


  return (
    <StyledFusionAixComponentsFxSentenceWrapper>
      {showHeader && (
        <Text variant='h3' style={{ display: 'flex', justifyContent: Alignment }}>
          {showHeader}
        </Text>
      )}
      <div style={{ display: 'flex', justifyContent: Alignment }}>
        {sentenceElements?.map((element) => {
          return element?.name === 'URL' ? (
            <Link href={element.value} variant='link' target='_blank'>
              {element?.value}&nbsp;
            </Link>
          ) : (
            <div>{element.value}&nbsp;</div>
          );
        })}
      </div>
    </StyledFusionAixComponentsFxSentenceWrapper>
  );
}

FusionAixComponentsFxSentence.defaultProps = {
  label: undefined,
  showLabel: true,
  showHighlightedData: false
};
