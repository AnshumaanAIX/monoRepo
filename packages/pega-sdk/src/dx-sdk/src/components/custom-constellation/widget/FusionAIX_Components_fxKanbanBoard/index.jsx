/* eslint-disable no-nested-ternary */
import React from 'react';
import { useEffect, useState } from 'react';
import {
  registerIcon,
  Text,
  Card,
  CardHeader,
  Progress,
  Button,
  Icon,
  Configuration
} from '@pega/cosmos-react-core';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { loadDetails, updateGroupValue } from './utils';
import { Column } from './Column';
import { MainCard } from './styles';
import * as plusIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon';
import * as pencilIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/pencil.icon';
import PropTypes from 'prop-types';
// includes in bundle
import Operator from './Operator.jsx';

registerIcon(plusIcon, pencilIcon);
export default function FusionAixComponentsFxKanbanBoard (props){
  const {
    heading = '',
    dataPage = '',
    createClassname = '',
    height = '30rem',
    groups = '',
    groupProperty = '',
    detailsDataPage = '',
    detailsViewName = '',
    getPConnect
  } = props;
  const [columns, setColumns] = useState({});
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);

  const groupList = groups.split(',');

  const editTask = (id) => {
    getPConnect().getActionsApi().openLocalAction('pyUpdateCaseDetails', {
      caseID: id,
      containerName: 'modal',
      actionTitle: 'Edit task',
      type: 'express'
    });
  };

  const addNewEvent = () => {
    if (createClassname) {
      getPConnect().getActionsApi().createWork(createClassname, {
        openCaseViewAfterCreate: false
      });
    }
  };

  const getDetails = (id, classname) => {
    return loadDetails({
      id,
      classname,
      detailsDataPage,
      detailsViewName,
      getPConnect
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) return;

      const newSourceTaskList = Array.from(columns[source.droppableId].taskList);
      newSourceTaskList.splice(source.index, 1);
      newSourceTaskList.splice(destination.index, 0, tasks[draggableId]);

      const tmpColumns = {
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          taskList: newSourceTaskList
        }
      };
      setColumns(tmpColumns);
    } else {
      const newSourceTaskList = Array.from(columns[source.droppableId].taskList);
      const newDestinationTaskList = Array.from(columns[destination.droppableId].taskList);
      newSourceTaskList.splice(source.index, 1);
      newDestinationTaskList.splice(destination.index, 0, tasks[draggableId]);

      const tmpColumns = {
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          taskList: newSourceTaskList
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          taskList: newDestinationTaskList
        }
      };
      updateGroupValue({
        groupValue: destination.droppableId,
        groupProperty,
        columns: tmpColumns,
        setColumns,
        task: tasks[draggableId],
        getPConnect
      });
      setColumns(tmpColumns);
    }
  };

  const loadTasks = () => {
    setLoading(true);
    (window).PCore.getDataApiUtils()
      .getData(dataPage, {})
      .then(async (response) => {
        if (response.data.data !== null) {
          const tmpColumns = {};
          const tmpTasks = {};
          groupList.forEach((group) => {
            const taskList= [];
            tmpColumns[group] = { id: group, taskList };
          });
          setColumns(tmpColumns);
          response.data.data.forEach((item) => {
            const myColumn = tmpColumns[item[groupProperty]];
            if (myColumn?.taskList) {
              tmpTasks[item.pyID] = {
                id: item.pyID,
                title: item.pyLabel,
                classname: item.pxObjClass,
                insKey: item.pzInsKey,
                groupValue: item[groupProperty],
                getDetails,
                editTask
              };
              myColumn.taskList.push(tmpTasks[item.pyID]);
            }
          });

          let numTasks = Object.entries(tmpTasks).length;
          if (numTasks > 0) {
            Object.entries(tmpTasks).forEach(async ([key]) => {
              const tmpTask = tmpTasks[key];
              const details = await getDetails(key, tmpTask.classname);
              tmpTask.details = details;
              numTasks -= 1;
              if (numTasks === 0) {
                setColumns(tmpColumns);
                setTasks(tmpTasks);
                setLoading(false);
              }
            });
          } else {
            setColumns(tmpColumns);
            setTasks(tmpTasks);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
  };

  /* Subscribe to changes to the assignment case */
  useEffect(() => {
    (window).PCore.getPubSubUtils().subscribe(
      (window).PCore.getEvents().getCaseEvent().ASSIGNMENT_SUBMISSION,
      () => {
        /* If an assignment is updated - force a reload of the events */
        loadTasks();
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
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, groupProperty]);

  if (!groups || !groupProperty) return null;



  return (
     <Configuration>
      <DragDropContext onDragEnd={onDragEnd}>
        <Card>
          <CardHeader
            actions={
              createClassname ? (
                <Button variant='simple' label='Create new task' icon compact onClick={addNewEvent}>
                  <Icon name='plus' />
                </Button>
              ) : undefined
            }
          >
            <Text variant='h2'>{heading}</Text>
          </CardHeader>
          <MainCard height={height}>
            {loading ? (
              <Progress placement='local' message='Loading content...' />
            ) : (
              groupList.map((group) => (
                <Column
                  key={group}
                  id={group}
                  title={group}
                  tasks={columns[group]?.taskList}
                ></Column>
              ))
            )}
          </MainCard>
        </Card>
      </DragDropContext>
    </Configuration>
  )
}

FusionAixComponentsFxKanbanBoard.defaultProps = {
  "label": "Create operator",
  "title": "Create operator",
  createLabel: null,
  updateLabel: null,
  createOperator: null,
  updateOperator: null,
  createDateTime: null,
  updateDateTime: null,
  resolveLabel: null,
  resolveOperator: null,
  resolveDateTime: null,
  hideLabel: false
};

FusionAixComponentsFxKanbanBoard.propTypes = {
  getPConnect: PropTypes.func.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
  createLabel: PropTypes.string,
  updateLabel: PropTypes.string,
  resolveLabel: PropTypes.string,
  createOperator: PropTypes.objectOf(PropTypes.any),
  updateOperator: PropTypes.objectOf(PropTypes.any),
  resolveOperator: PropTypes.objectOf(PropTypes.any),
  createDateTime: PropTypes.string,
  updateDateTime: PropTypes.string,
  resolveDateTime: PropTypes.string,
  hideLabel: PropTypes.bool
};

// as objects are there in props, shallow comparision fails & re-rendering of comp happens even with
// same key value pairs in obj. hence using custom comparison function on when to re-render
// const comparisonFn = (prevProps, nextProps) => {
//   return prevProps.updateDateTime === nextProps.updateDateTime;
// };
