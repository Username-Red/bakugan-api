const express = require('express');
const router = express.Router();

const { getClassic, createClassic, updateClassic, deleteClassic } = require('../controllers/classic');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getClassic);
router.post('/', isAuthenticated, createClassic);
router.put('/:_id', isAuthenticated, updateClassic);
router.delete('/:_id', isAuthenticated, deleteClassic);


module.exports = router;

