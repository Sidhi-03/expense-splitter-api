const express = require('express');
const router = express.Router();
const { createGroup, addUserToGroup } = require('../controllers/groupController');

router.post('/', createGroup);
router.put('/:id/add', addUserToGroup);

module.exports = router;
