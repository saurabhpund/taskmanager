// components/AddTaskForm.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowIcon from "../Assets/arrow.png";

const AddTaskForm = ({ handleAddTasks }) => {
  const [task, setTask] = useState({
    id : Date.now(),
    name: "",
    description: "",
    priority: "",
    complete: false,
  });
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({
    name: false,
    description: false,
    priority: false,
  });

  const validateForm = () => {
    const errors = {
      name: !task.name,
      description: !task.description,
      priority: !task.priority,
    };
    setValidationError(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleAddTasks(task);
    setTask({ name: "", description: "", priority: "", complete: false });
    navigate("/");
  };

  return (
    <>
      <Button style={{ marginTop: "3rem", width: "1rem" }}>
        <Link to={"/"}>
          <img src={ArrowIcon} style={{ width: "60%" }} alt="arrow icon" />
        </Link>
      </Button>
      <Container className="container" maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Add Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            fullWidth
            margin="normal"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            error={validationError.name}
            helperText={validationError.name && "Name is required"}
            required
          />
          <TextField
            label="Task Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            error={validationError.description}
            helperText={validationError.description && "Description is required"}
            required
          />
          <FormControl fullWidth margin="normal" required error={validationError.priority}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              label="Priority"
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
              color="primary"
            >
              Add Task
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddTaskForm;
