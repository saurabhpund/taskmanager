// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/Tasklist";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import { Container, Button, Box, Typography } from "@mui/material";
import AddIcon from "./Assets/plus.png";
import Gif from "./Assets/giphy.gif"

const Home = ({ tasks, onDelete, onComplete }) => {
  const [sortedTask, setSortedTask] = useState([]);
  useMemo(() => {
    const sortedTasks = tasks
      .slice()
      .sort((a, b) =>
        a.priority < b.priority ? 1 : a.priority > b.priority ? -1 : 0
      )
      .sort((a, b) => (a.complete && !b.complete ? 1 : -1));
    setSortedTask(sortedTasks);
  }, [tasks]);

  const AddButton = () => {
    return (
      <div style={{ position: "absolute", left: "50%" }}>
        <Button
          style={{
            borderRadius: "50%",
            width: "4rem",
            position: "fixed",
            bottom: "10%",
          }}
        >
          <Link to={"/add"}>
            <img src={AddIcon} alt="add icon" />
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <>
      <Container style={{ position: "relative" }}>
        <h1
          className="title"
          style={{
            textAlign: "center",
            padding: "1.5rem 0",
            fontFamily: "monospace",
          }}
        >
          TaskMaster
        </h1>
        {tasks.length == 0 ? (
          <EmptyTaskListMessage />
        ) : (
          <>
            <TaskList
              tasks={sortedTask}
              onDelete={onDelete}
              onComplete={onComplete}
            />
          </>
        )}
        <AddButton />
      </Container>
    </>
  );
};

const EmptyTaskListMessage = () => {
  return (
    <Box textAlign="center" marginTop="2rem">
      <Typography variant="h5" color="textSecondary">
        No tasks available. Click here to add a new task!
      </Typography>
      <div className="gif">
        <img src={Gif} width={"22%"} alt="gif" />
      </div>
      
    </Box>
  );
};

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      // Ensure storedTasks is an array
      return Array.isArray(storedTasks) ? storedTasks : [];
    } catch (error) {
      console.error("Error parsing tasks from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const handleAddTasks = (task) => {
    setTasks([...tasks, task]);
  };

  const handleEdit = (editedTask) => {
    const taskIndex = tasks.findIndex((task) => task.id === editedTask.id);

    // If the task is found, update it in the array
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = editedTask;
      setTasks(updatedTasks);
    }
  };

  const handleTaskComplete = (task) => {
    task.complete = !task.complete;
    setTasks([...tasks]);
  };

  return (
    <Router>
      <div className="App">
        <Container
          style={{
            width: "80%",
            height: "80%",
            position: "relative",
            background: "#fff",
            overflowY: "scroll",
            borderRadius: "15px",
          }}
        >
          <div className="tab">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <Container style={{ padding: "1rem 0" }}>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <Home
                    tasks={tasks}
                    onDelete={handleDelete}
                    onComplete={handleTaskComplete}
                  />
                }
              />

              <Route
                path="/add"
                element={<AddTaskForm handleAddTasks={handleAddTasks} />}
              />

              <Route
                path="/edit/:id"
                element={<EditTaskForm tasks={tasks} handleEdit={handleEdit} />}
              />
            </Routes>
          </Container>
        </Container>
      </div>
    </Router>
  );
};

export default App;
