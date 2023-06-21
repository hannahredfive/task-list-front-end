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

// const updateDelete = (animalId) => {
//   const updatedAnimals = animals.map(animal => {
//     if (animal.id !== animalId) {
//       return { ...animal };
//     }
//   });

//   // taken from https://stackoverflow.com/questions/28607451/removing-undefined-values-from-array
//   const filteredUpdatedData = updatedAnimals.filter(function (element) {
//     return element !== undefined;
//   });

//   setAnimals(filteredUpdatedData);
// }

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

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
