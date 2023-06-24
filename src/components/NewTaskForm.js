import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const INITIAL_FORM_DATA = {
  title: '', 
  description: ''
};

function NewTaskForm(props) {
  const [taskFormData, setTaskFormData] = useState(INITIAL_FORM_DATA);

  const anInputChanged = (evt) => {
    const newTaskFormData = {
      ...taskFormData,
      [evt.target.name]: evt.target.value
    };

    setTaskFormData(newTaskFormData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.createNewTask(taskFormData);
    setTaskFormData(INITIAL_FORM_DATA);
  };

  return (
    <section>
      <h3>Create New Task</h3>
      <form className='stack' onSubmit={handleFormSubmit}>
        <label htmlFor='taskName'>Task Title:</label>
        <input
          id='taskTitle'
          name='title'
          type='text'
          value={ taskFormData.title }
          onChange={ anInputChanged }
        />
        <label htmlFor='taskDescription'>Description:</label>
        <input
          id='taskDescription'
          name='description'
          type='text'
          value={ taskFormData.description }
          onChange={ anInputChanged }
        />
        <input type='submit' value='Add new task'></input>
      </form>
    </section>
  );
}

NewTaskForm.propTypes = {
  createNewTask: PropTypes.func.isRequired
};

export default NewTaskForm;