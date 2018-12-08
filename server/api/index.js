'use strict'

const router = require('express').Router()
const studentsRouter = require('./sub-routes/students')
const campusesRouter = require('./sub-routes/campuses')

router.use('/students', studentsRouter)
router.use('/campuses', campusesRouter)

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router