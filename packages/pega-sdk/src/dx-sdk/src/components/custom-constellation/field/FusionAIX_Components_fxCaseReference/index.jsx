import React from 'react';
import { Link, Configuration } from '@pega/cosmos-react-core';

const FusionAixComponentsFxCaseReference = (props) => {
  const { getPConnect, fieldMetadata, selectionProperty, value } = props;
  if (value) {
    const objClass = fieldMetadata?.classID;
    const key = selectionProperty;
    const linkURL = (window).PCore.getSemanticUrlUtils().getResolvedSemanticURL(
      (window).PCore.getSemanticUrlUtils().getActions().ACTION_OPENWORKBYHANDLE,
      { caseClassName: objClass },
      { workID: value }
    );

    return (
      <Configuration>
        <Link
          href={linkURL}
          previewable
          onPreview={() => {
            getPConnect().getActionsApi().showCasePreview(encodeURI(key), {
              caseClassName: objClass
            });
          }}
          onClick={(e) => {
            /* for links - need to set onClick for spa to avoid full reload - (cmd | ctrl) + click for opening in new tab */
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              getPConnect().getActionsApi().openWorkByHandle(key, objClass);
            }
          }}
        >
          {value}
        </Link>
      </Configuration>
    );
  }
  return null;
};

export default FusionAixComponentsFxCaseReference;
