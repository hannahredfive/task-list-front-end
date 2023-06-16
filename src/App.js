import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const updateTaskStatus = (taskID) => {
    const updatedTasks = tasks.map(task => {
    if (tasks.id === taskID) {
        task.isComplete = !task.isComplete;
      }
      return {...task};
    });

    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} />}</div>
      </main>
    </div>
  );
};

export default App;
