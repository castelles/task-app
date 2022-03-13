require('./db/mongoose')
const express = require("express")
const error = require('./model/error')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

const multer = require('multer')
const { Error } = require('mongoose')

// Pass incoming json data to an object 
app.use(express.json())
// Routes
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
