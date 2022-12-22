import React, { useState, useRef, useEffect } from 'react';
import TaskList from './TaskList';
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentList, setCurrentList] = useState({});
  const taskNameRef = useRef();
  const newListNameRef = useRef();
  const loadListIdRef = useRef();

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list/default`);
            const data = await response.json();
            setTasks(data.tasks);
            setCurrentList({_id: data.id, name: data.name})
        }
        const fetchLists = async () => {
          const response = await fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list/`);
          const data = await response.json();
          setLists(data.lists);
        }
        try {
            fetchTasks();
            fetchLists();
        } catch (error) {
            console.log(error);
        }
        
    }, [])

    function toggletask(id) {
        const newtasks = [...tasks]
        const task = newtasks.find(task => task._id === id)
        task.completed = !task.completed
        setTasks(newtasks)
    }

    function handleAddTask(e) {
        if (taskNameRef.current.value === '') return;
        const newTask = {
            task: taskNameRef.current.value,
            completed: false
        }
        setTasks(prevtasks => {
            return [...prevtasks, {_id: tasks.length+1, task: newTask.task, completed: newTask.completed}]
        })
        taskNameRef.current.value = null
    }

    function handleDeleteTask(id) {
        const newtasks = tasks.filter(task => task._id != id);
        setTasks(newtasks);
    }

    function handleClearTasks() {
        const newtasks = tasks.filter(task => !task.completed);
        setTasks(newtasks);
    }

    function handleSaveCurrentList() {
        const newList = {
            name: newListNameRef.current.value,
            tasks: tasks.map(task => {
              return {
                  task: task.task,
                  completed: task.completed
              }
            }),
            done: tasks.filter(task => !task.completed).length === 0 ? true : false 
        }

        fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newList),
        }).then(response => response.json())
        .then(response => {
            setCurrentList({_id: response.new_list_id, name: newListNameRef.current.value});
            setLists(prevlists => {
                return [...prevlists, {_id: response.new_list_id, name: newListNameRef.current.value}]
            })
            newListNameRef.current.value = null;
        });

    }

    function handleUpdateCurrentList() {
        const updatedList = {
            tasks: tasks.map(task => {
              return {
                  task: task.task,
                  completed: task.completed
              }
            }),
            done: tasks.filter(task => !task.completed).length === 0 ? true : false
        }
        fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list/${currentList._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedList),
        });
    }

    function handleLoadList() {
        const fetchTasks = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/v1/task/list/${loadListIdRef.current.value}`);
            const data = await response.json();
            setTasks(data.tasks);
            setCurrentList({_id: data.id, name: data.name});
            loadListIdRef.current.value = null;
        }
        try {
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    }

    function handleDisplayAllLists() {
      alert(JSON.stringify(lists))
    }

  return (
    <div className='App'>
      <div className='head'>
        <div><h2>Current list: {currentList.name}</h2><h5>ID: {currentList._id}</h5></div>
        <input ref={loadListIdRef} type="text" style={{height: '25px'}}/>
        <button onClick={handleLoadList}>Load list</button>
        <button onClick={handleDisplayAllLists}>Show all lists</button>
        <div><h3>Total: {tasks.length} Left: {tasks.filter(task => !task.completed).length}</h3></div>
        <input ref={newListNameRef} type="text" style={{height: '25px'}}/>
        <button onClick={handleSaveCurrentList}>Save new</button><br/><br/>
        <input ref={taskNameRef} type="text" style={{height: '25px'}}/>
        <button onClick={handleAddTask}>Add task</button>
        <button onClick={handleClearTasks}>Clear Complete</button>
        <button onClick={handleUpdateCurrentList}>Update current list</button>
      </div>
      
      <TaskList tasks={tasks} toggletask={toggletask} deleteTask={handleDeleteTask}/>
    </div>
  )
}

export default App;