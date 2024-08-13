const express = require('express')
const router = express.Router()

const {
  getAllClients,
  getClient,
  createClient,
  deleteClient,
  updateClient
} = require('../controllers/clients.controller')

const requireAuth = require('../middleware/requireAuth')

// Require Auth for all routes
router.use(requireAuth)

// GET All
router.get(
    '/',
    getAllClients
)

// GET single
router.get(
    '/:id',
    getClient
)

// POST single
router.post(
    '/',
    createClient
)

// DELETE single
router.delete(
    '/:id',
    deleteClient
)

// UPDATE single
router.patch(
    '/:id',
    updateClient
)

module.exports = router