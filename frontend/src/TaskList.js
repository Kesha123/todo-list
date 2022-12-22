import Task from "./Task";
import './App.css'

function TaskList({ tasks, toggletask, deleteTask }) {
    return (
      tasks.map(task => {
        return <Task key={task._id} toggletask={toggletask} deleteTask={deleteTask} task={task} />
      })
    )
}

export default TaskList;