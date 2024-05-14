// /* eslint-disable no-nested-ternary */
// import { Fragment } from 'react';
// import { DateTimeDisplay, Card, CardHeader, CardContent, Flex } from '@pega/cosmos-react-core';
// import PropTypes from 'prop-types';

// // includes in bundle
// import Operator from './Operator.jsx';

// import StyledFusionAixComponentsFxCalendarWrapper from './styles';


// // Duplicated runtime code from Constellation Design System Component

// // props passed in combination of props from property panel (config.json) and run time props from Constellation
// // any default values in config.pros should be set in defaultProps at bottom of this file
// export default function FusionAixComponentsFxCalendar(props) {

//   const {
//     getPConnect,
//     title,
//     label,
//     createLabel,
//     updateLabel,
//     createOperator,
//     updateOperator,
//     createDateTime,
//     updateDateTime,
//     resolveLabel,
//     resolveOperator,
//     resolveDateTime,
//     hideLabel
//   } = props;


//   const [_label, user, dateTimeValue] =
//     label === 'Create operator'
//       ? [createLabel, createOperator, createDateTime]
//       : label === 'Update operator'
//       ? [updateLabel, updateOperator, updateDateTime]
//       : [resolveLabel, resolveOperator, resolveDateTime];



//   return user.userId && user.userName ? (
//     <StyledFusionAixComponentsFxCalendarWrapper>
//       <Card>
//       <CardHeader>{title}</CardHeader>
//       <CardContent>
//       <Flex container={{ direction: 'row'}}>
//       <Operator label={hideLabel ? null : _label} name={user.userName} id={user.userId} getPConnect={getPConnect} />

//       {dateTimeValue && (
//         <Fragment>
//           {' '}
//           <DateTimeDisplay value={dateTimeValue} variant='relative' />
//         </Fragment>
//       )}
//       </Flex>
//       </CardContent>
//       </Card>

//     </StyledFusionAixComponentsFxCalendarWrapper>
//   ) : (
//     <StyledFusionAixComponentsFxCalendarWrapper>
//     defVal
//     </StyledFusionAixComponentsFxCalendarWrapper>
//   );



// }

// FusionAixComponentsFxCalendar.defaultProps = {
//   "label": "Create operator",
//   "title": "Create operator",
//   createLabel: null,
//   updateLabel: null,
//   createOperator: null,
//   updateOperator: null,
//   createDateTime: null,
//   updateDateTime: null,
//   resolveLabel: null,
//   resolveOperator: null,
//   resolveDateTime: null,
//   hideLabel: false
// };

// FusionAixComponentsFxCalendar.propTypes = {
//   getPConnect: PropTypes.func.isRequired,
//   label: PropTypes.string,
//   title: PropTypes.string,
//   createLabel: PropTypes.string,
//   updateLabel: PropTypes.string,
//   resolveLabel: PropTypes.string,
//   createOperator: PropTypes.objectOf(PropTypes.any),
//   updateOperator: PropTypes.objectOf(PropTypes.any),
//   resolveOperator: PropTypes.objectOf(PropTypes.any),
//   createDateTime: PropTypes.string,
//   updateDateTime: PropTypes.string,
//   resolveDateTime: PropTypes.string,
//   hideLabel: PropTypes.bool
// };

// // as objects are there in props, shallow comparision fails & re-rendering of comp happens even with
// // same key value pairs in obj. hence using custom comparison function on when to re-render
// // const comparisonFn = (prevProps, nextProps) => {
// //   return prevProps.updateDateTime === nextProps.updateDateTime;
// // };




import { useEffect, useRef, useState } from 'react';
import { EventContentArg, EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// import FullCalendar from '@fullcalendar/react';
import {
  registerIcon,
  Icon,
  Text,
  Status,
  Link,
  FieldValueList,
  Card,
  CardHeader,
  CardContent,
  Button,
  Configuration,
  useTheme
} from '@pega/cosmos-react-core';
import StyledEventWrapper from './styles';
import * as plusIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon';

registerIcon(plusIcon);

const VIEW_TYPE = {
  DAY: 'timeGridDay',
  WEEK: 'timeGridWeek',
  MONTH: 'dayGridMonth'
};


/*
  Demo of the Calendar component using fullcalendar React component - this 3rd party lib is open source with MIT license
  Notes on the implementation:
    - 3 types of views are supported by default: Monthly, Weekly and Daily - Monthly does not show the hours - it uses a different view
      rendering with more details than the weekly and daily view (due to space allocation)
    - Only show start time of 7 AM to 7 PM - not configurable but could be exposed as settings
    - Listen to date change and persist the context in localstorage - on load - if the localstorage is present, will used this context
      to set the Initial start date and view
    - Listen to ASSIGNMENT_SUBMISSION event from the Constellation runtime - if the case is edited using the preview panel, the calendar data
      will be refreshed automatically
    - Settings allow to show the now indicator (Red line) and show the week-ends - More settings could be exposed (height, persist context, views...)
*/
export default function FusionAixComponentsFxCalendar(props) {
  const {
    heading = '',
    dataPage = '',
    createClassname = '',
    defaultViewMode = 'Monthly',
    nowIndicator = true,
    weekendIndicator = true,
    getPConnect
  } = props;
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const theme = useTheme();
  let dateInfo = { view: { type: VIEW_TYPE.MONTH } };
  const dateInfoStr = localStorage.getItem('fullcalendar');
  if (dateInfoStr) {
    dateInfo = JSON.parse(dateInfoStr);
    if (dateInfo.view.type === VIEW_TYPE.MONTH && dateInfo.end && dateInfo.start) {
      /* If showing month - find the date in the middle to get the month */
      const endDate = new Date(dateInfo.end).valueOf();
      const startDate = new Date(dateInfo.start).valueOf();
      const middle = new Date(endDate - (endDate - startDate) / 2);
      dateInfo.startStr = `${middle.toISOString().substring(0, 7)}-01`;
    }
  }

  const getDefaultView = () => {
    if (dateInfo?.view?.type) {
      /* If the context is persisted in session storage - then used this info as default view */
      return dateInfo.view.type;
    }
    let defaultView;
    switch (defaultViewMode) {
      case 'Monthly':
        defaultView = VIEW_TYPE.MONTH;
        break;
      case 'Weekly':
        defaultView = VIEW_TYPE.WEEK;
        break;
      case 'Daily':
        defaultView = VIEW_TYPE.DAY;
        break;
      default:
        defaultView = VIEW_TYPE.MONTH;
    }
    return defaultView;
  };

  const addNewEvent = () => {
    if (createClassname) {
      getPConnect().getActionsApi().createWork(createClassname, {
        openCaseViewAfterCreate: false
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    const obj = eventInfo.event._def.extendedProps.item;
    let isdayGrid = true;
    if (eventInfo.view.type === VIEW_TYPE.DAY || eventInfo.view.type === VIEW_TYPE.WEEK) {
      isdayGrid = false;
    }
    const eventDateStr = `${obj.StartTime.substring(0, 5)} - ${obj.EndTime.substring(0, 5)}`;
    const linkURL = (window).PCore.getSemanticUrlUtils().getResolvedSemanticURL(
      (window).PCore.getSemanticUrlUtils().getActions().ACTION_OPENWORKBYHANDLE,
      { caseClassName: obj.pxObjClass },
      { workID: obj.pyID }
    );
    const linkEl = (
      <Link
        href={linkURL}
        previewable
        style={
          isdayGrid
            ? {
              wordBreak: 'break-all'
            }
            : {
              color: '#FFF',
              wordBreak: 'break-all'
            }
        }
        onPreview={() => {
          getPConnect().getActionsApi().showCasePreview(encodeURI(eventInfo.event.id), {
            caseClassName: obj.pxObjClass
          });
        }}
        onClick={(e) => {
          /* for links - need to set onClick for spa to avoid full reload - (cmd | ctrl) + click for opening in new tab */
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            getPConnect().getActionsApi().openWorkByHandle(obj.pzInsKey, obj.pxObjClass);
          }
        }}
      >
        {isdayGrid ? obj.pyID : `${eventInfo.event.title} - ${eventDateStr}`}
      </Link>
    );
    if (!isdayGrid) {
      return linkEl;
    }
    return (
      <StyledEventWrapper theme={theme}>
        <Text variant='h3'>{eventInfo.event.title}</Text>
        <FieldValueList
          variant='inline'
          style={{
            gap: 'normal'
          }}
          fields={[
            {
              id: 'id',
              name: 'Case ID',
              value: linkEl
            },
            {
              id: 'time',
              name: 'time',
              value: eventDateStr
            },
            {
              id: 'status',
              name: 'Status',
              value: <Status variant='success'>{obj.pyStatusWork}</Status>
            }
          ]}
        />
      </StyledEventWrapper>
    );
  };

  const loadEvents = () => {
    (window).PCore.getDataApiUtils()
      .getData(dataPage, {})
      .then((response) => {
        if (response.data.data !== null) {
          const tmpevents = [];
          response.data.data.forEach((item) => {
            tmpevents.push({
              id: item.pzInsKey,
              title: item.pyLabel,
              start: new Date(`${item.SessionDate}T${item.StartTime}`),
              end: new Date(`${item.SessionDate}T${item.EndTime}`),
              item
            });
          });
          setEvents(tmpevents);
        }
      });
  };

  const handleEventClick = (eventClickInfo) => {
    const eventDetails = eventClickInfo.event.extendedProps;
    getPConnect()
      .getActionsApi()
      .openWorkByHandle(eventDetails.item.pzInsKey, eventDetails.item.pxObjClass);
  };

  const handleDateChange = (objInfo) => {
    localStorage.setItem('fullcalendar', JSON.stringify(objInfo));
  };

  /* Subscribe to changes to the assignment case */
  useEffect(() => {
    (window).PCore.getPubSubUtils().subscribe(
      (window).PCore.getEvents().getCaseEvent().ASSIGNMENT_SUBMISSION,
      () => {
        /* If an assignment is updated - force a reload of the events */
        loadEvents();
      },
      'ASSIGNMENT_SUBMISSION'
    );
    return () => {
      (window).PCore.getPubSubUtils().unsubscribe(
        (window).PCore.getEvents().getCaseEvent().ASSIGNMENT_SUBMISSION,
        'ASSIGNMENT_SUBMISSION'
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Configuration>
      <Card>
        <CardHeader
          actions={
            createClassname ? (
              <Button variant='simple' label='Create new event' icon compact onClick={addNewEvent}>
                <Icon name='plus' />
              </Button>
            ) : undefined
          }
        >
          <Text variant='h2'>{heading}</Text>
        </CardHeader>
        <CardContent>
          <FullCalendar
            ref={calendarRef}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: `${VIEW_TYPE.MONTH},${VIEW_TYPE.WEEK},${VIEW_TYPE.DAY}`
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView={getDefaultView()}
            selectable
            nowIndicator={nowIndicator}
            weekends={weekendIndicator}
            allDayText='All day'
            slotMinTime='07:00:00'
            slotMaxTime='19:00:00'
            height={650}
            slotEventOverlap={false}
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            datesSet={handleDateChange}
            initialDate={
              dateInfo !== null && dateInfo.startStr
                ? dateInfo.startStr.substring(0, 10)
                : undefined
            }
            slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
          />
        </CardContent>
      </Card>
    </Configuration>
  );
}
