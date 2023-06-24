import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios, {isCancel, AxiosError} from 'axios';

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
  const URL_PREFIX = 'https://task-list-api-c17.onrender.com/'

  const loadTasks = () => {
    axios
      .get(URL_PREFIX + '/tasks')
      .then((response) => {
        const initialTaskData = [];
        response.data.forEach((task) => {
          initialTaskData.push(task);
        });
        setTasks(initialTaskData);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect( () => {
    loadTasks();
  }, []);

  const updateTaskStatus = (taskID) => {
    //console.log('hellllloooo im inside  update4TaskStatus');
    const updatedTasks = tasks.map(task => {
    if (task.id === taskID) {
        return { ...task, isComplete: !task.isComplete };
        //task.isComplete = !task.isComplete;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (taskID) => {
    const updatedTasks = tasks.map(task => {
      if (task.id !== taskID) {
        return task;
      }
    });
  
    const filteredUpdatedData = updatedTasks.filter (function (element) {
      return element !== undefined;
    });

    setTasks(filteredUpdatedData);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} /></div>
      </main>
    </div>
  );
};

export default App;
