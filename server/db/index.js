'use strict'

const db = require('./database')
const Sequelize = require('sequelize')
const Students = require('./models/students')
const Campuses = require('./models/campuses')

Campuses.hasMany(Students)
Students.belongsTo(Campuses)

module.exports = {
  db,
  Students,
  Campuses
}