import React, { useState } from 'react';

function ProgressBarPage() {
  const [progressBars, setProgressBars] = useState([]);
  const [newProgressBarName, setNewProgressBarName] = useState('');


  const handleDeleteProgressBar = (progressBarId) => {
    setProgressBars((prevProgressBars) => prevProgressBars.filter((pb) => pb.id !== progressBarId));
  };

  const handleCreateProgressBar = () => {
    const newProgressBar = {
      id: Date.now(),
      name: newProgressBarName,
      tasks: [],
      progress: 0,
    };
    setProgressBars((prevProgressBars) => [...prevProgressBars, newProgressBar]);
    setNewProgressBarName('');
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
      progressBar.tasks = progressBar.tasks.filter((task) => task.id!== taskId);
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
  
        <div style={{ maxHeight: '600px', overflowY: 'scroll' }}>
          {progressBars.map((progressBar) => (
            <div key={progressBar.id} style={{ margin: '20px 0' }}>
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
                    <label for={`task-${task.id}`} style={{ fontSize: 18, flex: 1 }}>
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
                  Progress: {Math.round(progressBar.progress)}%
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
                }}
              >
                &#x2715; Delete This Work
              </button>

            </div>
          ))}
        </div>   
        <style jsx>{`

div::-webkit-scrollbar {

  width: 0;

  height: 0;

}

div {

  -ms-overflow-style: none; /* for IE and Edge */

  scrollbar-width: none; /* for Firefox */

}

`}</style>
      </div>
    </div>
    
  );
}

export default ProgressBarPage;