const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('All users')
    res.render('index', {title: 'Home Page'})
})
router.get('/add', (req, res) => {
    res.render('add_users', {title: 'Add Users Page'})
})

module.exports = router