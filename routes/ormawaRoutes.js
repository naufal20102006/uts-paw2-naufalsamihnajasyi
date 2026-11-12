const express = require('express');
const router = express.Router();
const ormawaController = require('../controllers/ormawaController');

router.post('/', ormawaController.create);
router.get('/', ormawaController.getAll);
router.get('/:id', ormawaController.getById);

module.exports = router;
