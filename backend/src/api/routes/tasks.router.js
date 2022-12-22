const express = require('express')
const router = express.Router()
const Task = require('../models/task');
const List = require('../models/list')

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

router.get('/tocomplete', async (req, res) => {
    try {
      const tasks = await Task.find(
          {
              completed: false
          }
      );
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
})

router.get('/:id', getTask, (req, res) => {
    res.status(200).json(res.task)
})

router.post('/', async (req, res) => {
    const task = new Task({
      task: req.body.task,
      completed: req.body.completed
    })
    try {
      const newTask = await task.save()
      res.status(201).json({taskId: newTask._id})
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getTask, async (req, res) => {
    if (req.body.task != null) {
      res.task.task = req.body.task
    }
    if (req.body.completed != null) {
      res.task.completed = req.body.completed
    }
    try {
      const updatedTask = await res.task.save()
      res.status(200).json({message: 'Updated'})
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getTask, async (req, res) => {
    try {
        const taskId = res.task._id;
        List.find({ tasks: { $in: [taskId] } }).then(async lists => {
            await Promise.all(lists.map(async list => {
                await List.findByIdAndUpdate(list._id, { $pull: { tasks: taskId } },{ new: true })
            }));
        });
        
        await res.task.remove();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


async function getTask(req, res, next) {
    var task;
    try {
        task = await Task.findById(req.params.id);
      if (task == null) {
        return res.status(404).json({ message: 'Cannot find task' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.task = task;
    next();
}

module.exports = router;