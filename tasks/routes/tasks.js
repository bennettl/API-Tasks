var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var Task        = require('../models/task.js');

/* GET tasks listing. */
router.get('/', function(req, res, next) {
    Task.find(function(err, tasks){
        if (err) return next(err);
        res.json(tasks);
    });
});

/* POST create task */
router.post('/', function(req, res, next){

    Task.create(req.body, function(err, task){
        if (err) return next(err);
        res.json(task);
    });
});

/* DELETE remove all */
router.delete('/', function(req, res, next){
    Task.remove({}, function(err, task){
        if (err) return next(err);
        res.json(task);
    });
});

/* GET task with id */
router.get('/:id', function(req, res, next){
    Task.findById(req.params.id, function (err, task){
        if (err) return next(err);
        res.json(task);
    });
});

/* PUT update task with id */
router.put('/:id', function(req, res, next){
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, task){
        if (err) return next(err);
        res.json(task);
    });
});


/* DELETE remove task with id */
router.delete('/:id', function(req, res, next){
    Task.findByIdAndRemove(req.params.id, req.body, function(err, task){
        if (err) return next(err);
        res.json(task);
    });
});

module.exports = router;
