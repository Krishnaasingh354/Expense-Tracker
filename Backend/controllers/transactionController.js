const Transaction = require('../models/Transaction');

// POST /api/transactions
exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;

    if (!title || !amount || !type || !category || !date)
      return res.status(400).json({ message: 'Required fields missing' });

    const transaction = await Transaction.create({ title, amount, type, category, date, note });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const { type, category, sort = 'date', order = 'desc' } = req.query;
    const filter = {};
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
    const result = await Transaction.aggregate([
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

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