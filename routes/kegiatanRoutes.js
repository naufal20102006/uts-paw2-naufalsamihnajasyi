const express = require('express');
const router = express.Router();
const kegiatanController = require('../controllers/kegiatanController');

router.post('/', kegiatanController.create);
router.get('/', kegiatanController.getAll);
router.get('/:id', kegiatanController.getById);

module.exports = router;
