const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create({ name: req.body.name });
    res.status(201).json(group);
  } catch {
    res.status(500).json({ error: 'Group creation failed' });
  }
};

exports.addUserToGroup = async (req, res) => {
  const { id } = req.params; // group ID
  const { userId } = req.body;

  try {
    const group = await Group.findById(id);
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }
    res.json(group);
  } catch {
    res.status(500).json({ error: 'Could not add user to group' });
  }
};
