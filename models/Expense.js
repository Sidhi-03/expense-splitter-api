const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  description: { type: String }
});
module.exports = mongoose.model('Expense', expenseSchema);
