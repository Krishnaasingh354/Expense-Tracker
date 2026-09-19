import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TransactionContext = createContext();
const API = '/api/transactions';

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  // सारे transactions fetch करो
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API);
      setTransactions(res.data);
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add
  const addTransaction = async (data) => {
    try {
      const res = await axios.post(API, data);
      setTransactions(prev => [res.data, ...prev]);
      await fetchTransactions(); // For latest data refetch
    } catch (error) {
      console.error('Add error:', error.message);
    }
  };

  // Update
  const updateTransaction = async (id, data) => {
    try {
      const res = await axios.put(`${API}/${id}`, data);
      setTransactions(prev => prev.map(t => t._id === id ? res.data : t));
    } catch (error) {
      console.error('Update error:', error.message);
    }
  };

  // Delete
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error('Delete error:', error.message);
    }
  };

  // Single transaction
  const getById = (id) => transactions.find(t => t._id === id);

  // Summary
  const getSummary = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((s, t) => s + Number(t.amount), 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((s, t) => s + Number(t.amount), 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getById,
      getSummary
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);