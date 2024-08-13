const express = require('express')
const router = express.Router()

const {
    getAllServices,
    getService,
    createService,
    deleteService,
    updateService
} = require('../controllers/services.controller')

const requireAuth = require('../middleware/requireAuth')

// Require Auth for all routes
router.use(requireAuth)

// GET All
router.get(
    '/',
    getAllServices
)

// GET single
router.get(
    '/:id',
    getService
)

// POST single
router.post(
    '/',
    createService
)

// DELETE single
router.delete(
    '/:id',
    deleteService
)

// UPDATE single
router.patch(
    '/:id',
    updateService
)

module.exports = router