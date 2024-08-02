import React, { useState, useEffect } from 'react';

function ProgressBarPage() {
  const [progressBars, setProgressBars] = useState([]);
  const [newProgressBarName, setNewProgressBarName] = useState('');

  useEffect(() => {
    try {
      const storedProgressBars = JSON.parse(localStorage.getItem('progressBars')) || [];
      setProgressBars(storedProgressBars);
    } catch (error) {
      console.error('Lỗi khi tải progress bars từ localStorage:', error);
    }
  }, []);
  

  useEffect(() => {
    // Save progress bars to localStorage whenever it changes
    localStorage.setItem('progressBars', JSON.stringify(progressBars));
  }, [progressBars]);

  const handleDeleteProgressBar = (progressBarId) => {
    setProgressBars((prevProgressBars) => prevProgressBars.filter((pb) => pb.id !== progressBarId));
  };

  const handleCreateProgressBar = () => {
    try {
      const newProgressBar = {
        id: Date.now(),
        name: newProgressBarName,
        tasks: [],
        progress: 0,
      };
      const updatedProgressBars = [...progressBars, newProgressBar];
      setProgressBars(updatedProgressBars);
      localStorage.setItem('progressBars', JSON.stringify(updatedProgressBars));
      setNewProgressBarName('');
    } catch (error) {
      console.error('Lỗi khi lưu progress bar vào localStorage:', error);
    }
  };

  const handleAddTask = (progressBarId, taskName) => {
    const progressBar = progressBars.find((pb) => pb.id === progressBarId);
    if (progressBar) {
      progressBar.tasks.push({ id: Date.now(), name: taskName, completed: false });
      setProgressBars((prevProgressBars) => [...prevProgressBars]);
    }
  };

  const handleTaskComplete = (progressBarId, taskId, completed) => {
    const progressBar = progressBars.find((pb) => pb.id === progressBarId);
    if (progressBar) {
      const task = progressBar.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = completed;
        const completedTasks = progressBar.tasks.filter((task) => task.completed);
        progressBar.progress = (completedTasks.length / progressBar.tasks.length) * 100;
        setProgressBars((prevProgressBars) => [...prevProgressBars]);
      }
    }
  };

  const handleDeleteTask = (progressBarId, taskId) => {
    const progressBar = progressBars.find((pb) => pb.id === progressBarId);
    if (progressBar) {
      const task = progressBar.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = false; // untick the task
      }
      progressBar.tasks = progressBar.tasks.filter((task) => task.id !== taskId);
      const completedTasks = progressBar.tasks.filter((task) => task.completed);
      progressBar.progress = (completedTasks.length / progressBar.tasks.length) * 100 || 0;
      setProgressBars((prevProgressBars) => [...prevProgressBars]);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%', margin: '20px auto' }}>
        <input
          type="text"
          value={newProgressBarName}
          onChange={(e) => setNewProgressBarName(e.target.value)}
          placeholder="Enter your work"
          style={{
            fontSize: 18,
            width: '100%',
            padding: '10px',
            margin: '20px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleCreateProgressBar}
          style={{
            fontSize: 18,
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#3e8e41',
            },
          }}
        >
          Create
        </button>

        <div style={{ maxHeight: '600px', overflowY: 'scroll', marginTop: '40px' }}>
          {progressBars.map((progressBar) => (
            <div
              key={progressBar.id}
              style={{
                margin: '20px 0',
                padding: '20px',
                border: '2px solid #87df2c',
                borderRadius: '10px',
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                {progressBar.name}
              </h2>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {progressBar.tasks.map((task) => (
                  <li key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={(e) => handleTaskComplete(progressBar.id, task.id, e.target.checked)}
                      style={{
                        fontSize: 18,
                        marginRight: '10px',
                      }}
                    />
                    <label htmlFor={`task-${task.id}`} style={{ fontSize: 18, flex: 1 }}>
                      {task.name}
                    </label>
                    <button
                      onClick={() => handleDeleteTask(progressBar.id, task.id)}
                      style={{
                        fontSize: 18,
                        padding: '5px 10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      &#x2715;
                    </button>
                  </li>
                ))}
              </ul>

              <progress
                value={progressBar.progress}
                max="100"
                style={{
                  fontSize: 18,
                  width: '100%',
                  height: '20px',
                  margin: '20px 0',
                  borderRadius: '10px',
                  backgroundColor: '#ccc',
                }}
              />

              <p style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                You have completed {Math.round(progressBar.progress)}% of work
              </p>

              <input
                type="text"
                placeholder="Enter new task name"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTask(progressBar.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{
                  fontSize: 18,
                  width: '100%',
                  padding: '10px',
                  margin: '20px 0',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />

              <button
                onClick={() => handleDeleteProgressBar(progressBar.id)}
                style={{
                  fontSize: 18,
                  padding: '5px 10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, border-radius 0.3s',
                  borderRadius: '5px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5cff66';
                  e.target.style.borderRadius = '10px';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderRadius = '5px';
                }}
              >
                ✔ Done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressBarPage;
