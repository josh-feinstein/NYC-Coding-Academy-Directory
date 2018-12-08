const router = require('express').Router()
const Students = require('../../db/models/students')
const Campuses = require('../../db/models/campuses')

router.get('/', async (req, res, next) => {
    try {
        const allStudents = await Students.findAll({
            order: [
                ['firstName', 'ASC']
            ]
        })
        res.status(200).json(allStudents)
    } catch (err) {
        next(err)
    }
})

router.get('/:studentId', async (req, res, next) => {
    try {
        const allStudents = await Students.find({ where: { id: req.params.studentId }, include: [{ model: Campuses }] })
        res.status(200).json(allStudents)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newStudent = await Students.create(req.body)
        res.json(newStudent)
    } catch (err) {
        next(err)
    }
})

router.delete('/:studentId', async (req, res, next) => {
    try {
        const deletedStudent = await Students.destroy({ where: { id: req.params.studentId } })
        res.json(deletedStudent)
    } catch (err) {
        next(err)
    }
})

router.put('/:studentId', async (req, res, next) => {
    try {
        const updatedStudent = await Students.update(req.body, { where: { id: req.params.studentId } })
        res.json(updatedStudent)
    } catch (err) {
        next(err)
    }
})

module.exports = router 