import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ProgressBarPage() {
  const [progressBars, setProgressBars] = useState([]);
  const [newProgressBarName, setNewProgressBarName] = useState("");

  useEffect(() => {
    try {
      const storedProgressBars = JSON.parse(
        Cookies.get("progressBars") || "[]"
      );
      setProgressBars(storedProgressBars);
    } catch (error) {
      console.error("Lỗi khi tải progress bars từ cookies:", error);
    }
  }, []);

  useEffect(() => {
    try {
      Cookies.set("progressBars", JSON.stringify(progressBars), { expires: 7 }); // Cookie hết hạn sau 7 ngày
    } catch (error) {
      console.error("Lỗi khi lưu progress bars vào cookies:", error);
    }
  }, [progressBars]);

  const handleDeleteProgressBar = (progressBarId) => {
    setProgressBars((prevProgressBars) =>
      prevProgressBars.filter((pb) => pb.id !== progressBarId)
    );
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
      setNewProgressBarName("");
    } catch (error) {
      console.error("Lỗi khi tạo progress bar:", error);
    }
  };

  const handleAddTask = (progressBarId, taskName) => {
    const progressBar = progressBars.find((pb) => pb.id === progressBarId);
    if (progressBar) {
      progressBar.tasks.push({
        id: Date.now(),
        name: taskName,
        completed: false,
      });
      setProgressBars((prevProgressBars) => [...prevProgressBars]);
    }
  };

  const handleTaskComplete = (progressBarId, taskId, completed) => {
    const progressBar = progressBars.find((pb) => pb.id === progressBarId);
    if (progressBar) {
      const task = progressBar.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = completed;
        const completedTasks = progressBar.tasks.filter(
          (task) => task.completed
        );
        progressBar.progress =
          (completedTasks.length / progressBar.tasks.length) * 100;
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
      progressBar.tasks = progressBar.tasks.filter(
        (task) => task.id !== taskId
      );
      const completedTasks = progressBar.tasks.filter((task) => task.completed);
      progressBar.progress =
        (completedTasks.length / progressBar.tasks.length) * 100 || 0;
      setProgressBars((prevProgressBars) => [...prevProgressBars]);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#111827", // gray-900
        color: "#f3f4f6", // gray-100
        padding: "20px",
      }}
    >
      <div style={{ width: "80%", maxWidth: "800px", margin: "20px auto" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#87df2c", // Màu chủ đạo
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Work Management
        </h1>

        <div
          style={{
            display: "flex",
            marginBottom: "30px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <input
            type="text"
            value={newProgressBarName}
            onChange={(e) => setNewProgressBarName(e.target.value)}
            placeholder="Enter new task"
            style={{
              fontSize: 16,
              flex: 1,
              padding: "15px",
              border: "none",
              outline: "none",
              backgroundColor: "#1f2937", // gray-800
              color: "#f3f4f6", // gray-100
              transition: "all 0.3s ease",
              borderLeft: "4px solid transparent",
            }}
            onFocus={(e) => {
              e.target.style.borderLeft = "4px solid #87df2c";
              e.target.style.paddingLeft = "20px";
              e.target.style.backgroundColor = "#2d3748"; // Màu xám nhạt hơn một chút
            }}
            onBlur={(e) => {
              e.target.style.borderLeft = "4px solid transparent";
              e.target.style.paddingLeft = "15px";
              e.target.style.backgroundColor = "#1f2937"; // Trở lại màu ban đầu
            }}
          />
          <button
            onClick={handleCreateProgressBar}
            style={{
              fontSize: 16,
              padding: "15px 25px",
              backgroundColor: "#87df2c",
              color: "#111827",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#6abf24";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#87df2c";
              e.target.style.transform = "scale(1)";
            }}
          >
            Create
          </button>
        </div>

        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {progressBars.map((progressBar) => (
            <div
              key={progressBar.id}
              style={{
                margin: "20px 0",
                padding: "25px",
                backgroundColor: "#1f2937", // gray-800
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: `2px solid #87df2c`, // Màu chủ đạo
              }}
            >
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 15,
                  textAlign: "center",
                  color: "#87df2c",
                }}
              >
                {progressBar.name}
              </h2>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {progressBar.tasks.map((task) => (
                  <li
                    key={task.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={(e) =>
                        handleTaskComplete(
                          progressBar.id,
                          task.id,
                          e.target.checked
                        )
                      }
                      style={{
                        fontSize: 20,
                        marginRight: "15px",
                        accentColor: "#87df2c", // Màu chủ đạo
                      }}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      style={{ fontSize: 18, flex: 1, color: "#f3f4f6" }}
                    >
                      {task.name}
                    </label>
                    <button
                      onClick={() => handleDeleteTask(progressBar.id, task.id)}
                      style={{
                        fontSize: 20,
                        padding: "5px 10px",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#f87171", // red-400
                      }}
                    >
                      &#x2715;
                    </button>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#374151", // gray-700
                  borderRadius: "5px",
                  overflow: "hidden",
                  margin: "20px 0",
                }}
              >
                <div
                  style={{
                    width: `${progressBar.progress}%`,
                    height: "100%",
                    backgroundColor: "#87df2c", // Màu chủ đạo
                    transition: "width 0.3s ease",
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#87df2c",
                }}
              >
                You have completed {Math.round(progressBar.progress)}% of work
              </p>

              <input
                type="text"
                placeholder="Enter new work"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask(progressBar.id, e.target.value);
                    e.target.value = "";
                  }
                }}
                style={{
                  fontSize: 16,
                  width: "100%",
                  padding: "12px",
                  margin: "20px 0",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#374151", // gray-700
                  color: "#f3f4f6", // gray-100
                }}
              />

              <button
                onClick={() => handleDeleteProgressBar(progressBar.id)}
                style={{
                  fontSize: 16,
                  padding: "10px 15px",
                  backgroundColor: "#87df2c",
                  color: "#111827",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "8px",
                  transition: "background-color 0.3s, transform 0.2s",
                  display: "block",
                  margin: "0 auto",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#6abf24";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#87df2c";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Work done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressBarPage;
