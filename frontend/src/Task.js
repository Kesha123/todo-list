import './App.css'

function Task({ task, toggletask, deleteTask }) {
    function handletaskClick() {
        toggletask(task._id);
    }

    function handleDeleteTask() {
        deleteTask(task._id);
    }
    
    return (
      <div className='task' style={{'--completed': task.completed ? 'green' : (Number(task.id) % 2 === 0) ? '#c0c0c2' : '#a0a1a4'}}>
        <label>
          <input type="checkbox" checked={task.completed} onChange={handletaskClick} />
          {task.task}
          <input className='task-button' type="button" value="Delete task" onClick={handleDeleteTask} style={{float: 'right'}}/>      
        </label>
      </div>
    )
}

export default Task;