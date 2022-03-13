const mongoose = require('mongoose')

const mongodb_url = process.env.MONGODB_URL
mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})