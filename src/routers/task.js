const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../model/task')

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (er) {
        res.status(400).send(er)
    }

})

router.get('/tasks', auth, async (req, res) => {

    const match = { owner: req.user._id }
    const sort = { }

    const { 
        completed, 
        limit, 
        offset,
        sortBy,
        orderBy
    } = req.query

    try {

        if (completed) {
            if (completed === 'true')
                match.completed = true
            else if (completed === 'false')
                match.completed = false
            else
                return res.status(400).send()
        }

        var order = -1

        if (orderBy) {
            if (orderBy === 'asc') order = 1
            else if (orderBy === 'desc') order = -1
            else return res.status(400).send()
        }

        if (sortBy) {
            sort[sortBy] = order
        } else {
            sort['createdAt'] = order
        }

        const tasks = await Task.find(
            match, 
            null, 
            {
                limit: parseInt(limit),
                skip: parseInt(offset),
                sort
            })

        // Option 2 - 
        // await req.user.populate({
        //     path: 'tasks',
        //     match
        // }).execPopulate()

        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error : 'Invalid updates!' })

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Task.findById(req.params.id)

        if (!task) return res.status.apply(404).send()

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router