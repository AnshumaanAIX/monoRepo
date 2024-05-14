import PropTypes from 'prop-types';
import { Input, FormField, LocationInput, MapsContext } from '@pega/cosmos-react-core';
import { useState, useMemo, useEffect } from 'react';
import AutoComplete, { usePlacesWidget } from "react-google-autocomplete";
import StyledFusionAixComponentsFxLocationAddressWrapper from './styles';

export default function FusionAixComponentsFxLocationAddress(props /* : FusionAixComponentsFxLocationAddressProps */) {
  const { getPConnect, placeholder, disabled, readOnly, required, label, address } = props;
  const [locationObj, setLocationObj] = useState('');
  const [option, setoptions] = useState('');
  const [googleKey, setGoogleKey] = useState(false);

  // const pConn = useMemo(() => getPConnect(), [getPConnect]);
  // const actions = useMemo(() => pConn.getActionsApi(), [pConn]);
  // const propName = pConn?.getStateProps().address;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.address;
  // const apiKey = useMemo(() => pConn.getGoogleMapsAPIKey(), [pConn]);
  // console.log("google api  keygoogle api  key111");
  // // const context = pConn.getContextName();
  const handleOnChange = event => {
    actions.updateFieldValue(propName, JSON.stringify(event));
    actions.triggerFieldChange(propName, JSON.stringify(event));
  };
  useEffect(() => {
    const parameters = {
      CountryImplementationID: ''
    };
    const options = {
      invalidateCache: true
    };
    const context = "app/primary_1";
    PCore.getDataPageUtils().getPageDataAsync('D_AppSettingsSharedLPC', context, parameters, options)
      .then(response => {
        const arr = [];
        console.log("google api  key response from Dpage", response);
        setoptions(response?.GoogleAPIKey);
        setGoogleKey(true);
      })
      .catch(error => {
        console.log('error of locationadress', error);
      });
  }, []);
  return (
    <StyledFusionAixComponentsFxLocationAddressWrapper>
      {option &&
        <AutoComplete
          apiKey={option}
          onPlaceSelected={(place) => {
            console.log(place); setLocationObj(JSON.stringify(place)),
              handleOnChange(JSON.stringify(place));
          }}
          label={label}
        />}
    </StyledFusionAixComponentsFxLocationAddressWrapper>
  );
}
