const router = require('express').Router()
const Campuses = require('../../db/models/campuses')
const Students = require('../../db/models/students')

router.get('/', async (req, res, next) => {
    try {
        const allCampuses = await Campuses.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        res.json(allCampuses)
    } catch (err) {
        next(err)
    }
})

router.get('/:campusId', async (req, res, next) => {
    try {
        const allCampuses = await Campuses.find({
            where: { id: req.params.campusId },
            include: [{ model: Students }],
        })
        res.json(allCampuses)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newCampus = await Campuses.create(req.body)
        res.json(newCampus)
    } catch (err) {
        next(err)
    }
})

router.delete('/:campusId', async (req, res, next) => {
    try {
        const deletedCampus = await Campuses.destroy({ where: { id: req.params.campusId } })
        res.json(deletedCampus)
    } catch (err) {
        next(err)
    }
})

router.put('/:campusId', async (req, res, next) => {
    try {
        const updatedCampus = await Campuses.update(req.body, { where: { id: req.params.campusId } })
        res.json(updatedCampus)
    } catch (err) {
        next(err)
    }
})

module.exports = router 