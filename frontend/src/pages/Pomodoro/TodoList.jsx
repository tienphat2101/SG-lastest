import React, { useState } from "react";
import styles from "./ToDoList.module.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className={styles.todoContainer}>
      <h3>To-Do List</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a task"
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addButton}>
          Add
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            {task}
            <button
              onClick={() => removeTask(index)}
              className={styles.removeButton}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
