const express = require('express')
const router = express.Router()
const List = require('../models/list');
const Task = require('../models/task');

router.get('/', async (req, res) => {
    try {
      	const lists = await List.find();

		const response = {
			lists: await Promise.all(lists.map(async function(list){
				return {_id: list._id, name: list.name};
			}))
		}	

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

router.get('/default', async (req, res) => {
    try {
      const defaultList = await List.findOne({name: "default"});
      if (defaultList == null) {
        res.status(404).json({message: 'No sush list'});
    }

    const response = {
        id: defaultList._id,
        name: defaultList.name,
        tasks: await Promise.all(defaultList.tasks.map(async function(task){
            return await Task.findById(task._id);;
        })),
        done: defaultList.done
    }

    res.status(200).json(response);

    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);

        if (list == null) {
            res.status(404).json({message: 'No sush list'});
        }

        const response = {
            id: list._id,
            name: list.name,
            tasks: await Promise.all(list.tasks.map(async function(task){
                return await Task.findById(task._id);;
            })),
            done: list.done
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


router.post('/', async (req, res) => {    
    try {
        const list = new List({
            name: req.body.name,
            tasks: await Promise.all(req.body.tasks.map(async function(task){
                const newTask = new Task({
                    task: task.task,
                    completed: task.completed
                })
                await newTask.save();
                return newTask.id;
            })),        
            done: req.body.tasks.filter(task => !task.completed).length === 0 ? true : false        
        });
        const newList = await list.save();
        res.status(201).json({"new_list_id": newList._id});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);

        await Promise.all(list.tasks.map(async function(task){
            await Task.findByIdAndDelete(task._id);
        }))

        const tasks = await Promise.all(req.body.tasks.map(async function(task){
            const newTask = new Task({
                task: task.task,
                completed: task.completed
            })
            await newTask.save();
            return newTask.id;
        }))
        const updatedList = await List.findByIdAndUpdate({_id: req.params.id}, {tasks: tasks, done: req.body.done});
        res.status(200).json({message: 'Updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

router.delete('/:id', async (req, res) => {
    await List.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({message: "Deleted"})
    })
})


module.exports = router;