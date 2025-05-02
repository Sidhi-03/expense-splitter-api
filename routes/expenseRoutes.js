const express = require('express');
const router = express.Router();
const {
  addExpense,
  getGroupExpenses,
  settleBalances
} = require('../controllers/expenseController');

router.post('/', addExpense);
router.get('/:groupId', getGroupExpenses);
router.get('/settle/:groupId', settleBalances);

module.exports = router;
