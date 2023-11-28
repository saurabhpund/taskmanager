// components/EditTaskForm.js
import React, { useState, useEffect } from 'react';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import ArrowIcon from "../Assets/arrow.png";
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';

const EditTaskForm = ({ tasks, handleEdit }) => {
  const { id } = useParams(); // Get the id from the route parameters
  const [editedTask, setEditedTask] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const taskToEdit = tasks.find(task => task.id.toString() === id); // Convert id to string for comparison

    if (taskToEdit) {
      setEditedTask(taskToEdit);
    } else {
      // Handle case where task with the given id is not found (e.g., redirect to home or display an error)
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(editedTask);
    navigate("/")
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditedTask(null);
    redirect("/");
  };

  if (!editedTask) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Button style={{ marginTop: "3rem", width: "1rem" }}>
        <Link to={"/"}>
          <img src={ArrowIcon} style={{ width: "60%" }} alt="arrow icon" />
        </Link>
      </Button>
      <Container className="container" maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Edit Task
        </Typography>
        <form>
          <TextField
            label="Task Name"
            fullWidth
            margin="normal"
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
            required
          />
          <TextField
            label="Task Description"
            fullWidth
            multiline
            rows={4}
            value={editedTask.description}
            margin="normal"
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              label="Priority"
              value={editedTask.priority}
            >
              <MenuItem value={3}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={1}>High</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              color="primary"
            >
              Submit
            </Button>
            <Button
              type="submit"
              onClick={handleCancel}
              variant="outlined"
              style={{marginLeft: "10px"}}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default EditTaskForm;
