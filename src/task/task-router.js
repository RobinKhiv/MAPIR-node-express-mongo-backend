const express = require('express');
const uuidv1 = require('uuid/v1');
const taskRouter = express.Router();
const jsonBodyParser = express.json();
const Task = require('../models/task');

taskRouter
  .route('/')
  .get((req, res, next)=> {
    Task.fetchAll()
      .then(task => 
        res.status(200).json(task));
  })
  .post(jsonBodyParser, (req, res, next) => {
    let newTask = {
      id: uuidv1(), 
      title: req.body.title, 
      isDone: false
    };

    for (const [key, value] of Object.entries(newTask))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    const task = new Task(newTask.id, newTask.title, newTask.isDone);
    task.save();
    res.status(201).json(newTask);
  });

taskRouter
  .route('/:taskId')
  .get((req, res)=> {
    const taskId = req.params.taskId;
    Task.findById(taskId)
      .then(result => 
        res.json(result));
  })
  .patch(jsonBodyParser, (req, res, next) =>{ 
    const updatedTask = {id: req.body.id, title:req.body.title, isDone: req.body.isDone }

    for(const[key, value] of Object.entries(updatedTask))
      if(value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`});

    const task = new Task(updatedTask.id, updatedTask.title, updatedTask.isDone);
    task.update()
      .then(() => 
        res.status(204).end());
  }).delete((req, res, next) => {
    const taskId = req.params.taskId;
    Task.deleteById(taskId).then(() => {
      res.status(204).end();
    });
  });

module.exports = taskRouter;