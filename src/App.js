import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "./App.css"; // Import your CSS file here

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };
  const onChangeDescriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      task,
      priority,
      deadline,
      description,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setPriority("top");
    setDeadline("");
    setDescription("");
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const deleteDone = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editTaskId === id) {
      setEditTaskId(null);
    }
  };

  const upcomingTasks = tasks.filter((t) => !t.done);

  return (
    <>
      <div className="App">
        <header>
          <h1>Task Manager</h1>
        </header>
        <main>
          <div className="task-form">
            <input
              type="text"
              id="task"
              placeholder="Enter task..."
              value={task}
              onChange={handleTaskChange}
            />
            <select
              id="priority"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="top">Top Priority</option>
              <option value="middle">Middle Priority</option>
              <option value="low">Less Priority</option>
            </select>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={handleDeadlineChange}
            />

            <textarea
              placeholder="Enter Task Description"
              id="taskDescription"
              value={description}
              onChange={onChangeDescriptionInput}
              className="input-bar-name"
              name="description"
              rows="4"
              cols="50"
            />
            <button id="add-task" onClick={addTask}>
              Add Task
            </button>
          </div>
          <h2 className="heading">Tasks</h2>
          <div className="task-list" id="task-list">
            <table>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingTasks.map((t) => (
                  <tr key={t.id}>
                    <td>{t.task}</td>
                    <td>{t.description}</td>
                    <td>{t.priority}</td>
                    <td>{t.deadline}</td>
                    <td>
                      {!t.done && (
                        <>
                          <button
                            className="mark-done"
                            onClick={() => markDone(t.id)}
                          >
                            Mark Done
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteDone(t.id)}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="completed-task-list">
            <h2 className="cheading">Completed Tasks</h2>
            <table>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((ct) => (
                  <tr key={ct.id}>
                    <td>{ct.task}</td>
                    <td>{ct.description}</td>
                    <td>{ct.priority}</td>
                    <td>{ct.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
