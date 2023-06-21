import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const [complete, setComplete] = useState(props.isComplete);
  const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  const toggleComplete = () => {
    console.log("Hello i'm inside toggleComplete!");
    setComplete(!complete);
    props.updateTaskStatus(props.id);
  }


  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => setComplete(toggleComplete)}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button"
      onClick={() => props.deleteTask(props.id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default Task;
