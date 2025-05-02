const Expense = require('../models/Expense');
const Group = require('../models/Group');

exports.addExpense = async (req, res) => {
  const { groupId, paidBy, amount, description } = req.body;
  try {
    const expense = await Expense.create({
      groupId, paidBy, amount, description
    });
    res.status(201).json(expense);
  } catch {
    res.status(500).json({ error: 'Expense creation failed' });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ groupId: req.params.groupId });
    res.json(expenses);
  } catch {
    res.status(500).json({ error: 'Could not fetch expenses' });
  }
};

exports.settleBalances = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate('members');
    const expenses = await Expense.find({ groupId });

    const balances = {};

    group.members.forEach(user => balances[user.id] = 0);

    expenses.forEach(exp => {
      const share = exp.amount / group.members.length;
      group.members.forEach(member => {
        if (member.id === exp.paidBy.toString()) {
          balances[member.id] += (exp.amount - share);
        } else {
          balances[member.id] -= share;
        }
      });
    });

    const result = [];
    for (let uid in balances) {
      if (balances[uid] < 0) {
        const creditor = Object.keys(balances).find(
          otherId => balances[otherId] > 0
        );
        const amount = Math.min(-balances[uid], balances[creditor]);
        result.push({
          user: group.members.find(u => u.id === uid).name,
          owes: group.members.find(u => u.id === creditor).name,
          amount: Math.round(amount * 100) / 100
        });
        balances[uid] += amount;
        balances[creditor] -= amount;
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Could not settle balances' });
  }
};
