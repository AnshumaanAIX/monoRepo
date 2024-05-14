

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Text,
  TextArea,
  Icon,
  registerIcon,
  Configuration
} from '@pega/cosmos-react-core';
import React, { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { Message, TypeIndicator, type MessageProps } from '@pega/cosmos-react-social';
import * as resetIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/reset.icon';
import * as sendIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/send.icon';
import * as robotSolid from '@pega/cosmos-react-core/lib/components/Icon/icons/robot-solid.icon';

import { StyledCardContent, StyledGenAIComponent } from './styles';
import { string } from 'prop-types';

type HistoryItem = {
  id: string;
  value: ReactElement<MessageProps>;
};

type ChatGenAIProps = {
  heading: string;
  dataPage: string;
  maxHeight: string;
  sendAllUserContext: boolean;
  getPConnect: any;
};

registerIcon(resetIcon, sendIcon, robotSolid);

export default function FusionAixComponentsFxChatGenAi(props: ChatGenAIProps) {
  const {
    heading = 'AI Assistant',
    dataPage = '',
    maxHeight = '20rem',
    sendAllUserContext = false,
    getPConnect
  } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<Array<HistoryItem>>([]);
  const [chats, setChats] = useState<Array<string>>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const genAIErrorMessage = 'Unable to process the request. Please try again after sometime.';

  const loadResponse = (response: string) => {
    const id = `A#${history.length}`;
    const item = {
      id,
      value: <Message message={response} direction='in' senderType='agent' senderId={id} />
    };
    setHistory(prev => [...prev, item]);
  };

  const postQuestion = useCallback(
    (userPrompt: string) => {
      // Trigger the request to Gen AI
      const dataViewName = dataPage;
      const message = sendAllUserContext ? [...chats, userPrompt] : [userPrompt];
      const parameters = {
        prompt: JSON.stringify(message)
      };
      setLoading(true);
      setChats((previous: Array<string>) => {
        previous.push(userPrompt);
        return previous;
      });
      const context = getPConnect().getContextName();
      (window as any).PCore.getDataPageUtils()
        .getPageDataAsync(dataViewName, context, parameters, { invalidateCache: true })
        .then(({ pyMessage }: { pyMessage: string }) => {
          loadResponse(pyMessage ?? genAIErrorMessage);
        })
        .catch((error: Error) => {
          loadResponse(`Error ${error.message}. ${genAIErrorMessage}`);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataPage, getPConnect, loadResponse]
  );

  const submitQuestion = useCallback(() => {
    if (!loading) {
      const id = `Q#${history.length}`;
      const item = {
        id,
        value: <Message message={value} direction='out' senderType='customer' senderId={id} />
      };
      setHistory(prev => [...prev, item]);
      postQuestion(value);
      setValue('');
    }
  }, [loading, history.length, postQuestion, value]);

  const handleEnter = useCallback(
    (event: KeyboardEvent) => {
      if (!event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        submitQuestion();
      }
    },
    [submitQuestion]
  );

  const resetContext = () => {
    setHistory([]);
    setChats([]);
    setValue('');
  };

  const questionArea = (
    <CardFooter container={{ direction: 'column' }}>
      {loading && (
        <TypeIndicator
          avatarInfo={{
            name: 'GenAI Assistant'
          }}
          senderType='bot'
          senderId='bot'
        />
      )}
      <Flex container={{ direction: 'row', gap: 1 }}>
        <Flex item={{ grow: 1 }}>
          <TextArea
            label='Message'
            value={value}
            minLength={0}
            maxLength={500}
            autoResize
            onChange={e => setValue(e.target.value)}
            placeholder='Enter your question'
            onKeyPress={handleEnter}
          />
        </Flex>
        <Flex item={{ alignSelf: 'center' }}>
          <Button variant='simple' label='Send' icon onClick={submitQuestion} disabled={loading}>
            <Icon name='send' />
          </Button>
        </Flex>
      </Flex>
    </CardFooter>
  );

  // useEffect to scroll to the bottom whenever the history changes if maxHeight is set to non auto
  useEffect(() => {
    setTimeout(() => {
      if (cardRef.current && maxHeight !== 'auto') {
        cardRef.current.scrollTop = cardRef.current.scrollHeight;
      }
    }, 0);
  }, [history, maxHeight]);

  // useEffect to reset the context
  useEffect(() => {
    resetContext();
  }, [sendAllUserContext]);

  return (
    <Configuration>
      <StyledGenAIComponent>
        <Card>
          <CardHeader
            actions={
              sendAllUserContext ? (
                <Button
                  variant='simple'
                  label='Restart conversation'
                  icon
                  compact
                  onClick={resetContext}
                >
                  <Icon name='reset' />
                </Button>
              ) : undefined
            }
          >
            <Text variant='h2'>{heading}</Text>
          </CardHeader>
          <StyledCardContent ref={cardRef} maxHeight={maxHeight}>
            {history.length ? (
              <Flex container={{ direction: 'column', pad: 1 }}>
                {history.map(e => (
                  <div key={e.id}>{e.value}</div>
                ))}
              </Flex>
            ) : null}
          </StyledCardContent>
          {questionArea}
        </Card>
      </StyledGenAIComponent>
    </Configuration>
  );
}















// import React, {useState} from "react";
// import TextField from '@material-ui/core/TextField';
// import Popover from '@material-ui/core/Popover';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// import { makeStyles } from '@material-ui/core/styles';

// import Utils from '@pega/react-sdk-components/lib/components/helpers/utils';
// import StyledFusionAixComponentsFxChatGenAiWrapper from './styles';
// import type { PConnProps } from '@pega/react-sdk-components/lib/types/PConnProps';


// interface FusionAixComponentsFxChatGenAiProps extends PConnProps {
//   // If any, enter additional props that only exist on this componentName
//   // eslint-disable-next-line react/no-unused-prop-types
//   label: string,
//   createDateTime: string,
//   createLabel: string,
//   createOperator: { userName: string, userId: string },
//   updateDateTime: string,
//   updateLabel: string,
//   updateOperator: { userName: string, userId: string }
// }


// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(1),
//     margin: theme.spacing(1),
//   },
//   popover: {
//     padding: theme.spacing(1),
//     margin: theme.spacing(1),
//   }
// }));

// // Duplicated runtime code from React SDK

// // Page Case Widget example

// // props passed in combination of props from property panel (config.json) and run time props from Constellation
// // any default values in config.pros should be set in defaultProps at bottom of this file
// export default function FusionAixComponentsFxChatGenAi(props: FusionAixComponentsFxChatGenAiProps) {
//   // const componentName = "Operator";
//   const classes = useStyles();

//   // const versionAr = pCoreVersion.split(".");
//   // let fieldLabel;
//   let caseOpLabel = "---";
//   let caseOpName = "---";
//   let caseOpId = "";
//   let caseTime = "";

//   let updateOpLabel = "---";
//   let updateOpName = "---";
//   let updateOpId = "";
//   let updateTime = "";

//   // fieldLabel = props.fieldLabel;
//   caseOpLabel = props.createLabel;
//   caseOpName = props.createOperator.userName;
//   caseTime = props.createDateTime;
//   caseOpId = props.createOperator.userId;

//   updateOpLabel = props.updateLabel;
//   updateOpName = props.updateOperator.userName;
//   updateTime = props.updateDateTime;
//   updateOpId = props.updateOperator.userId;




//   // Popover-related
//   const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
//   const [popoverFields, setPopoverFields] = useState<Array<any>>([]);

//   const popoverOpen = Boolean(popoverAnchorEl);
//   const popoverId = popoverOpen ? 'operator-details-popover' : undefined;

//   const handlePopoverClose = (() => {
//     setPopoverAnchorEl(null);
//   })

//   function showOperatorDetails(event) {

//     const operatorPreviewPromise = PCore.getUserApi().getOperatorDetails(caseOpId);
//     const localizedVal = PCore.getLocaleUtils().getLocaleValue;
//     const localeCategory = 'Operator';

//     operatorPreviewPromise.then((res) => {
//       const fillerString = "---";
//       let fields: any = [];
//       if (
//         res.data &&
//         res.data.pyOperatorInfo &&
//         res.data.pyOperatorInfo.pyUserName
//       ) {
//         fields = [
//           {
//             id: "pyPosition",
//             name: localizedVal("Position", localeCategory),
//             value: res.data.pyOperatorInfo.pyPosition ? res.data.pyOperatorInfo.pyPosition : fillerString
//           },
//           {
//             id: "pyOrganization",
//             name: localizedVal("Organization", localeCategory),
//             value: res.data.pyOperatorInfo.pyOrganization ? res.data.pyOperatorInfo.pyOrganization : fillerString
//           },
//           {
//             id: "ReportToUserName",
//             name: localizedVal('Reports to', localeCategory),
//             value: res.data.pyOperatorInfo.pyReportToUserName ? res.data.pyOperatorInfo.pyReportToUserName : fillerString
//           },
//           {
//             id: "pyTelephone",
//             name: localizedVal('Telephone', localeCategory),
//             value: res.data.pyOperatorInfo.pyTelephone ? <a href={`tel:${res.data.pyOperatorInfo.pyTelephone}`}>{res.data.pyOperatorInfo.pyTelephone}</a> : fillerString
//           },
//           {
//             id: "pyEmailAddress",
//             name: localizedVal('Email address', localeCategory),
//             value: res.data.pyOperatorInfo.pyEmailAddress ? <a href={`mailto:${res.data.pyOperatorInfo.pyEmailAddress}`}>{res.data.pyOperatorInfo.pyEmailAddress}</a> : fillerString
//           }
//         ];
//       } else {
//         // eslint-disable-next-line no-console
//         console.log(`Operator: PCore.getUserApi().getOperatorDetails(${caseOpId}); returned empty res.data.pyOperatorInfo.pyUserName - adding default`);
//         fields = [
//           {
//             id: "pyPosition",
//             name: localizedVal("Position", localeCategory),
//             value: fillerString
//           },
//           {
//             id: "pyOrganization",
//             name: localizedVal("Organization", localeCategory),
//             value: fillerString
//           },
//           {
//             id: "ReportToUserName",
//             name: localizedVal('Reports to', localeCategory),
//             value: fillerString
//           },
//           {
//             id: "pyTelephone",
//             name: localizedVal('Telephone', localeCategory),
//             value: fillerString
//           },
//           {
//             id: "pyEmailAddress",
//             name: localizedVal('Email address', localeCategory),
//             value: fillerString
//           }
//         ];
//       }
//       // Whatever the fields are, update the component's popoverFields
//       setPopoverFields(fields);
//     });

//     setPopoverAnchorEl(event.currentTarget);
//   }

//   function showUpdateOperatorDetails(event) {

//     const operatorPreviewPromise = PCore.getUserApi().getOperatorDetails(updateOpId);
//     const localizedVal = PCore.getLocaleUtils().getLocaleValue;
//     const localeCategory = 'Operator';

//     operatorPreviewPromise.then((res) => {
//       const fillerString = "---";
//       let fields: any = [];
//       if (
//         res.data &&
//         res.data.pyOperatorInfo &&
//         res.data.pyOperatorInfo.pyUserName
//       ) {
//         fields = [
//           {
//             id: "pyPosition",
//             name: localizedVal("Position", localeCategory),
//             value: res.data.pyOperatorInfo.pyPosition ? res.data.pyOperatorInfo.pyPosition : fillerString
//           },
//           {
//             id: "pyOrganization",
//             name: localizedVal("Organization", localeCategory),
//             value: res.data.pyOperatorInfo.pyOrganization ? res.data.pyOperatorInfo.pyOrganization : fillerString
//           },
//           {
//             id: "ReportToUserName",
//             name: localizedVal('Reports to', localeCategory),
//             value: res.data.pyOperatorInfo.pyReportToUserName ? res.data.pyOperatorInfo.pyReportToUserName : fillerString
//           },
//           {
//             id: "pyTelephone",
//             name: localizedVal('Telephone', localeCategory),
//             value: res.data.pyOperatorInfo.pyTelephone ? <a href={`tel:${res.data.pyOperatorInfo.pyTelephone}`}>{res.data.pyOperatorInfo.pyTelephone}</a> : fillerString
//           },
//           {
//             id: "pyEmailAddress",
//             name: localizedVal('Email address', localeCategory),
//             value: res.data.pyOperatorInfo.pyEmailAddress ? <a href={`mailto:${res.data.pyOperatorInfo.pyEmailAddress}`}>{res.data.pyOperatorInfo.pyEmailAddress}</a> : fillerString
//           }
//         ];
//       } else {
//         // eslint-disable-next-line no-console
//         console.log(`Operator: PCore.getUserApi().getOperatorDetails(${caseOpId}); returned empty res.data.pyOperatorInfo.pyUserName - adding default`);
//         fields = [
//           {
//             id: "pyPosition",
//             name: localizedVal("Position", localeCategory),
//             value: fillerString
//           },
//           {
//             id: "pyOrganization",
//             name: localizedVal("Organization", localeCategory),
//             value: fillerString
//           },
//           {
//             id: "ReportToUserName",
//             name: localizedVal('Reports to', localeCategory),
//             value: fillerString
//           },
//           {
//             id: "pyTelephone",
//             name: localizedVal('Telephone', localeCategory),
//             value: fillerString
//           },
//           {
//             id: "pyEmailAddress",
//             name: localizedVal('Email address', localeCategory),
//             value: fillerString
//           }
//         ];
//       }
//       // Whatever the fields are, update the component's popoverFields
//       setPopoverFields(fields);
//     });

//     setPopoverAnchorEl(event.currentTarget);
//   }

//   function getPopoverGrid() {
//     // return popoverFields.map((field) => {
//     //   return <div className={classes.popover}>{field.name}: {field.value}</div>
//     // })

//     if (popoverFields.length === 0) {
//       return;
//     }

//     // There are fields, so build the grid.
//     return <Grid container className={classes.popover} spacing={1}>
//       <Grid item xs={12}><Typography variant="h6">{caseOpName}</Typography></Grid>
//       {popoverFields.map((field) => {
//         return <React.Fragment key={field.id}>
//           <Grid container item xs={12} spacing={1}>
//             <Grid item xs={6}><Typography variant="caption">{field.name}</Typography></Grid>
//             <Grid item xs={6}><Typography variant="subtitle2">{field.value}</Typography></Grid>
//           </Grid>
//         </React.Fragment>
//       })}
//     </Grid>

//   }

//   // End of popover-related


//   return <StyledFusionAixComponentsFxChatGenAiWrapper><React.Fragment>
//     <Grid container spacing={2}>
//       <Grid item>
//       <TextField
//         defaultValue={caseOpName}
//         label={caseOpLabel}
//         onClick={showOperatorDetails}

//         InputProps={{
//           readOnly: true,
//           disableUnderline: true,
//           inputProps: {style: {cursor: 'pointer'}}
//         }}

//       />
//       <br />
//       {Utils.generateDateTime(caseTime, "DateTime-Since")}
//      </Grid>
//      <Grid item>
//       <TextField
//         defaultValue={updateOpName}
//         label={updateOpLabel}
//         onClick={showUpdateOperatorDetails}

//         InputProps={{
//           readOnly: true,
//           disableUnderline: true,
//           inputProps: {style: {cursor: 'pointer'}}
//         }}

//       />
//       <br />
//       {Utils.generateDateTime(updateTime, "DateTime-Since")}
//      </Grid>
//     </Grid>

//       <Popover
//         id={popoverId}
//         open={popoverOpen}
//         anchorEl={popoverAnchorEl}
//         onClose={handlePopoverClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
//         transformOrigin={{ vertical: 'top', horizontal: 'center'}}
//         PaperProps={{ style: {maxWidth: '45ch'}}}
//       >
//         {getPopoverGrid()}
//       </Popover>
//     </React.Fragment>
// 	</StyledFusionAixComponentsFxChatGenAiWrapper>;

// }
