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
  const URL_PREFIX = 'https://task-list-api-c17.onrender.com/';

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

  const updateTaskDBStatus = (taskID, completeStatus) => {
    axios
    .patch(URL_PREFIX + `/tasks/${taskID}/mark_${completeStatus}`)
    .then(() => {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskID) {
          return { ...task, isComplete: !task.isComplete };
        }
        return task;
      });    
      setTasks(updatedTasks);
    })
    .catch((error) => {
      console.log(`could not mark task as ${completeStatus}`, error);
    });
  };
  
  useEffect( () => {
    loadTasks();
  }, []);
  
  const updateTaskStatus = (taskID) => {
    tasks.forEach((task) => {
      if (task.id === taskID) {
        if (task.isComplete === true) {
          // if task is currently complete, mark as incomplete
          updateTaskDBStatus(taskID, 'incomplete');
        } else {
          // if task is currently incomplete, mark as complete
          updateTaskDBStatus(taskID, 'complete');
        }
      }
    });
    
  };

  const deleteTask = (taskID) => {
    axios.delete(`${URL_PREFIX}/tasks/${taskID}`)
      .then((response) => {
        const updatedTasks = tasks.map(task => {
          if (task.id !== taskID) {
            return task;
          }
        });
        const filteredUpdatedData = updatedTasks.filter (function (element) {
          return element !== undefined;
        });
        setTasks(filteredUpdatedData);
      })
      .catch((error) => {
        // if it's not successful, print out error details for now
        console.log('could not delete task', error, error.response);
      });
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
