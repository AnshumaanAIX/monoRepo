
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import {
  Configuration,
  FormControl,
  Flex,
  FormField,
  Link,
  useTheme,
  ErrorState
} from '@pega/cosmos-react-core';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { StyledCardContent, MainCard, GlobalStyle } from './styles';

export const convertDate = (v) => {
  if (v?.length === 8) {
    return new Date(`${v.substring(0, 4)}-${v.substring(4, 6)}-${v.substring(6, 8)}T00:00:00`);
  } else if (v?.length === 15) {
    return new Date(
      `${v.substring(0, 4)}-${v.substring(4, 6)}-${v.substring(6, 8)}T${v.substring(9, 11)}:${v.substring(11, 13)}:${v.substring(13, 15)}`
    );
  }
  return undefined;
};

export const convertTime = (v) => {
  if (v?.length === 6) {
    return `${v.substring(0, 2)}:${v.substring(2, 4)}`;
  }
  return undefined;
};

const FusionAixComponentsFxScheduler = props => {

  const { getPConnect, label, hideLabel = false, testId, value } = props;
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const theme = useTheme();
  const [isValidEventDate, setIsValidEventDate] = useState(false);
  const [initialDate, setInitialDate] = useState();

  const renderEventContent = (eventInfo) => {
    const obj = eventInfo.event._def.extendedProps.item;
    const linkURL = (window).PCore.getSemanticUrlUtils().getResolvedSemanticURL(
      (window).PCore.getSemanticUrlUtils().getActions().ACTION_OPENWORKBYHANDLE,
      { caseClassName: obj.ObjClass },
      { workID: obj.ID }
    );
    if (obj.Name) {
      const description = `Event ${eventInfo.event.title} for ${obj.Name} from ${convertTime(obj.StartTime)} to from ${convertTime(obj.EndTime)}`;
      const linkEl = (
        <Link
          href={linkURL}
          previewable
          aria-label={description}
          style={{
            wordBreak: 'break-all',
            color: '#FFFFFF'
          }}
          onPreview={() => {
            getPConnect().getActionsApi().showCasePreview(encodeURI(obj.InsKey), {
              caseClassName: obj.ObjClass
            });
          }}
          onClick={(e) => {

            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              getPConnect().getActionsApi().openWorkByHandle(obj.InsKey, obj.ObjClass);
            }
          }}
        >
          {`${eventInfo.event.title} - ${obj.Name}`}
        </Link>
      );
      return linkEl;
    }
    return <StyledCardContent>{eventInfo.event.title}</StyledCardContent>;
  };

  useEffect(() => {
    try {
      const data = JSON.parse(value);
      const tmpEvents = [];
      const pConn = getPConnect();
      const CaseInstanceKey = pConn.getValue('caseInfo.businessID');
      const newEvent = {
        ID: CaseInstanceKey,
        Label: pConn.getValue('caseInfo.name'),
        StartTime: data.StartTime,
        EndTime: data.EndTime
      };
      tmpEvents.push({
        id: newEvent.ID,
        title: newEvent.Label,
        start: convertDate(`${data.EventDate}T${newEvent.StartTime}`),
        end: convertDate(`${data.EventDate}T${newEvent.EndTime}`),
        item: newEvent
      });
      tmpEvents.push();
      if (data.Events) {
        data.Events.forEach((item) => {
          tmpEvents.push({
            id: item.ID,
            title: item.Label,
            start: convertDate(`${data.EventDate}T${item.StartTime}`),
            end: convertDate(`${data.EventDate}T${item.EndTime}`),
            item
          });
        });
      }

      setEvents(tmpEvents);
      setIsValidEventDate(false);
      if (data.EventDate) {
        const newDateStr = `${data.EventDate.substring(0, 4)}${data.EventDate.substring(4, 6)}${data.EventDate.substring(6, 8)}`;
        const newDate = convertDate(newDateStr);
        if (newDateStr.length === 8 && newDate instanceof Date && !Number.isNaN(newDate)) {
          setIsValidEventDate(true);
          if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(newDate);
          } else {
            setInitialDate(newDateStr);
          }
        }
      }
    } catch (e) { }
  }, [getPConnect, value]);

  return (
    <Configuration>
      <GlobalStyle />
      <Flex container={{ direction: 'column' }}>
        <FormField label={label} labelHidden={hideLabel} testId={testId}>
          <FormControl ariaLabel={label}>
            <MainCard theme={theme}>
              {isValidEventDate ? (
                <FullCalendar
                  ref={calendarRef}
                  timeZone='local'
                  headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ''
                  }}
                  plugins={[timeGridPlugin]}
                  initialView='timeGridDay'
                  selectable
                  nowIndicator={false}
                  weekends
                  allDayText='All day'
                  slotMinTime='07:00:00'
                  slotMaxTime='19:00:00'
                  height={650}
                  slotEventOverlap={false}
                  events={events}
                  initialDate={initialDate}
                  eventContent={renderEventContent}
                  slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                />
              ) : (
                <ErrorState message='Invalid event Date' />
              )}
            </MainCard>
          </FormControl>
        </FormField>
      </Flex>
    </Configuration>
  );
};

FusionAixComponentsFxScheduler.defaultProps = {
  value: '',
  placeholder: '',
  disabled: false,
  readOnly: false,
  required: false,
  testId: null
};

FusionAixComponentsFxScheduler.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  getPConnect: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  testId: PropTypes.string
};

export default FusionAixComponentsFxScheduler;
