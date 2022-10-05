require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 4000

// database connection
mongoose.connect(process.env.DB_URI, {
    // useNewParser: true,
    useUnifiedTopology: true,
})
// middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

// set template engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

// route prefix
app.use('', require('./routes/routes'))


app.listen(PORT, () => {
    console.log(`App started at https://localhost:${PORT}`)
})