const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Transactioncontroller');

router.get('/summary', ctrl.getSummary);
router.post('/', ctrl.createTransaction);
router.get('/', ctrl.getAllTransactions);
router.get('/:id', ctrl.getTransaction);
router.put('/:id', ctrl.updateTransaction);
router.delete('/:id', ctrl.deleteTransaction);

module.exports = router;