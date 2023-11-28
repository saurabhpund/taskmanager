// components/TaskList.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Button, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditTaskForm from './EditTaskForm';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onDelete, onComplete }) => {
  const [editTask, setEditTask] = useState(null);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onDelete={onDelete}
                  onComplete={onComplete}
                  onEdit={() => handleEdit(task)}
                />
              ))}
            </TableBody>
          </Table>

          {editTask && (
            <EditTaskForm
              task={editTask}
              onEdit={(updatedTask) => {
                // Implement your edit logic here
                // You can use the onEdit function to update the task in the parent component
                setEditTask(null); // Close the edit form after editing
              }}
              onCancel={handleCancelEdit}
            />
          )}
        </TableContainer>
      </Container>
    </>
  );
};

const Task = ({ task, onDelete, onEdit, onComplete }) => {
  const priorityColors = {
    1: { background: '#ffcdd2', color: '#f44336' },
    2: { background: '#fff9c4', color: '#ff9800' },
    3: { background: '#5dbea3', color: '#fff' },
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={task.complete} onChange={() => onComplete(task)} />
      </TableCell>
      <TableCell>{task.complete ? <s>{task.name}</s> : task.name}</TableCell>
      <TableCell>{task.complete ? <s>{task.description}</s> : task.description}</TableCell>
      <TableCell>
        <Button style={{ background: priorityColors[task.priority].background, color: priorityColors[task.priority].color }}>
          {task.priority === 1 && 'High'}
          {task.priority === 2 && 'Medium'}
          {task.priority === 3 && 'Low'}
        </Button>
      </TableCell>
      <TableCell>
        {!task.complete && (
          <>
            <IconButton color="primary" component={Link} to={`/edit/${task.id}`}>
              <EditIcon />
            </IconButton>
          </>
            )}
            <IconButton style={{color: "red"}} onClick={() => onDelete(task)}>
              <DeleteIcon />
            </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TaskList;
