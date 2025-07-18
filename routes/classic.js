const express = require('express');
const router = express.Router();

const { getClassic, createClassic, updateClassic, deleteClassic } = require('../controllers/classic');
router.get('/', getClassic);
router.post('/', createClassic);
router.put('/:_id', updateClassic);
router.delete('/:_id', deleteClassic);


module.exports = router;

