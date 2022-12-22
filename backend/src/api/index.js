const express = require('express');
const mongoose = require('mongoose');
const List = require('./models/list');
const Task = require('./models/task');
const tasks = require('./routes/tasks.router');
const lists = require('./routes/lists.router')

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true });
}

const db = mongoose.connection;

const defaultTasks = [
    {
        task: "Buy apples",
        completed: false
    },
    {
        task: "Buy pears",
        completed: false
    },
    {
        task: "Buy peaches",
        completed: false
    }
]

db.once('open', async () => {

    const defaultList = await List.find();

    if (defaultList.filter(list => list.name == "default").length > 0) {
        return;
    }

    const list = new List({
        name: "default",
        tasks: await Promise.all(defaultTasks.map(async function(task){
            const newTask = new Task({
                task: task.task,
                completed: task.completed
            })
            await newTask.save();
            return newTask.id;
        })),        
        done: false        
    });
    await list.save();
})

const router = express.Router();

router.use('/tasks', tasks);
router.use('/task/list', lists);

module.exports = router;
