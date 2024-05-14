import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxUserProfileWrapper from './styles';

// includes in bundle
import { getAllFields } from './utils';

// Duplicated runtime code from Constellation Design System Component
export const getView = (viewObject, getPConnect, refrencePagedataSource) => {
  return getPConnect.createComponent(viewObject, null, null, {
    context: getPConnect.getContextName(),
    pageReference: refrencePagedataSource,
    hasForm: true,
    isBulkAction: true,
    containerName: getPConnect?.getContainerName() || PCore.getConstants().MODAL
  });
};
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxUserProfile(props) {

  const { getPConnect, children } = props;

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();

  const [elements, setelements] = useState([]);
  const [SecondChilElements, setSecondChilElements] = useState([]);
  // console.log(children, "childrenchildren", tab1, tab2);
  const topChildrenPconn = children[0].props.getPConnect().getChildren()?.[0].getPConnect();
  const topchildrawConfig = topChildrenPconn.getRawMetadata();

  const {
    CONTAINER_TYPE: { MULTIPLE },
  } = PCore.getConstants();

  const childref = children[0].props
    .getPConnect()
    ?.getChildren()[0];

  const childReference = childref.getPConnect();
  const refView = childref.getPConnect().getReferencedViewPConnect().getPConnect().getRawMetadata();





  useEffect(() => {
    const referencedView = childref.getPConnect().getReferencedViewPConnect();
    // all the region access at this point
    const innerChild = referencedView.getPConnect().getChildren();

    const pageref = referencedView.getPConnect().getPageReference();
    const viewname = referencedView.getPConnect().getCurrentView();
    const refrencePagedataSource = pageref + topchildrawConfig.config.context;
    const ele = [];
    const secondElements = [];
    let loadview;
    innerChild.map((child, i) => {
      if (i === 1) {
        const innerchildVal = child.getPConnect().getChildren();
        innerchildVal.map((second, index) => {
          loadview = getView(second.getPConnect().getRawMetadata(), getPConnect(), refrencePagedataSource);
          secondElements.push(loadview);
        });

      }
      loadview = getView(child.getPConnect().getRawMetadata(), getPConnect(), refrencePagedataSource);
      ele.push(loadview);

    });
    setSecondChilElements(secondElements);
    setelements(ele);

  }, [children[1]]);
  console.log(refView, "refViewrefView");
  useEffect(() => {
    const dataObjectClass = refView?.config?.ruleClass;
    const dataObjectTokens = dataObjectClass.split('-');
    const dataObjectName = dataObjectTokens[dataObjectTokens.length - 1];
    const listDataPage = `D_${dataObjectName}`;
    const dataPageKeys = PCore?.getDataTypeUtils()?.getDataPageKeys(listDataPage) || [];

    if (dataPageKeys?.length === 0) {
      PCore.getRestClient()
        .invokeRestApi('showView', {
          queryPayload: {
            page: `${dataObjectName}`,
            pageClass: `${dataObjectTokens[0]}-${dataObjectTokens[1]}-UIPages`
          }
        })
        .then(response => {
          const { datapages, dataTypes } = response.data.uiResources.resources;
          PCore.getMetadataUtils().updateStores({ datapages, dataTypes });
        });
    }

    const { subscribe, unsubscribe } = PCore.getPubSubUtils();
    const { DATA_OBJECT_CREATED, DATA_OBJECT_UPDATED, DATA_OBJECT_DELETED } =
      PCore.getConstants().PUB_SUB_EVENTS.DATA_EVENTS;
    const loadEvents = evvt => {
      console.log(evvt);
    };
    subscribe(DATA_OBJECT_CREATED, () => loadEvents(), 'DATA_OBJECT_CREATED');
    subscribe(DATA_OBJECT_UPDATED, () => loadEvents(), 'DATA_OBJECT_UPDATED');
    subscribe(DATA_OBJECT_DELETED, () => loadEvents(), 'DATA_OBJECT_DELETED');

    return () => {
      unsubscribe(DATA_OBJECT_CREATED, 'DATA_OBJECT_CREATED');
      unsubscribe(DATA_OBJECT_UPDATED, 'DATA_OBJECT_UPDATED');
      unsubscribe(DATA_OBJECT_DELETED, 'DATA_OBJECT_DELETED');
    };
  }, [refView, children[1]]);
  useEffect(() => {
    const containerMgr = getPConnect().getContainerManager();
    containerMgr.initializeContainers({ type: MULTIPLE });
  }, [MULTIPLE, getPConnect(), children[1]]);


  const secondchild = () => {
    const pcon = children[1].props.getPConnect();
    const childrendata = pcon.getChildren();
    const rawmetaData = childrendata.getRawMetadata();
    const secondChildView = getView(rawmetaData, getPConnect(), 'pyPortal');

  };

  console.log(SecondChilElements, "SecondChilElementsSecondChilElementsSecondChilElements");
  return (
    <StyledFusionAixComponentsFxUserProfileWrapper>
      <div className="grid-container">
        <div className='main-grid-wrapper'>
          <div style={{
            display: 'flex',
            width: '100%',
            background: 'white',
            padding: '25px',
            borderRadius: '8px'
          }}>


            <div className='element0'>
              {elements[0]}
            </div>

            <div className='secondChild'>
              <div className='second-child'>
                {SecondChilElements[0]}
              </div>
              <div className='second-child-elements'>
                {SecondChilElements.filter((element, index) => index !== 0)}
              </div>
              {elements[2]}
            </div>
          </div>
          {/* <div className='element2'>{elements[2]}</div> */}
        </div>
        <div className='mainchildren-wrapper' style={{
          display: 'flex',
          padding: '24px'
        }}>
          <div className='children1'>
            {children[1]}
          </div>
          <div className='children2'>
            {children[2]}
          </div>
        </div>

      </div>
    </StyledFusionAixComponentsFxUserProfileWrapper>
  );

}

FusionAixComponentsFxUserProfile.defaultProps = {
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

FusionAixComponentsFxUserProfile.propTypes = {
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
