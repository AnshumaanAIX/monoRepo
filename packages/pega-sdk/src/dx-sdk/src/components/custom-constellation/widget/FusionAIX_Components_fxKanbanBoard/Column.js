import { useTheme } from '@pega/cosmos-react-core';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from './Task';
import { StyledColumn } from './styles';



export const Column = (props) => {
  const { title, id, tasks } = props;
  const theme = useTheme();
  return (
    <StyledColumn theme={theme}>
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks?.map((task, index) => (
              <Task key={task.id} index={index} {...task}></Task>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </StyledColumn>
  );
};
