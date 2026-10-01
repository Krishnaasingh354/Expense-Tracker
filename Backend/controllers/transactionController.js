const Transaction = require('../models/Transaction');

// POST /api/transactions
exports.createTransaction = async (req, res) => {
  try {
    const { username, title, amount, type, category, date, note } = req.body;
    const user = (username || req.headers['x-username'] || '').trim();

    if (!user) {
      return res.status(400).json({ message: 'Username is required to create a transaction' });
    }

    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const transaction = await Transaction.create({
      username: user,
      title,
      amount,
      type,
      category,
      date,
      note
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const { username, type, category, sort = 'date', order = 'desc' } = req.query;
    const user = (username || req.headers['x-username'] || '').trim();

    const filter = {};
    if (user) {
      filter.username = user;
    }
    if (type) filter.type = type;
    if (category) filter.category = category;

    const sortOrder = order === 'asc' ? 1 : -1;
    const transactions = await Transaction.find(filter).sort({ [sort]: sortOrder });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/transactions/summary
exports.getSummary = async (req, res) => {
  try {
    const { username } = req.query;
    const user = (username || req.headers['x-username'] || '').trim();

    const pipeline = [];
    if (user) {
      pipeline.push({ $match: { username: user } });
    }

    pipeline.push({
      $group: { _id: '$type', total: { $sum: '$amount' } }
    });

    const result = await Transaction.aggregate(pipeline);

    let totalIncome = 0, totalExpense = 0;
    result.forEach(r => {
      if (r._id === 'income') totalIncome = r.total;
      if (r._id === 'expense') totalExpense = r.total;
    });

    res.json({ totalIncome, totalExpense, balance: totalIncome - totalExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/transactions/:id
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};