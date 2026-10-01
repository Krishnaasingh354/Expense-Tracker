import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TransactionContext = createContext();
const API = '/api/transactions';

export function TransactionProvider({ children, username }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'error' | 'checking'

  // Quick health check to test backend visibility
  const checkBackend = useCallback(async () => {
    try {
      const res = await axios.get('/api/health', { timeout: 3000 });
      if (res.data?.status === 'ok') {
        setBackendStatus('connected');
        return true;
      }
    } catch {
      setBackendStatus('error');
      return false;
    }
  }, []);

  // Fetch transactions for the active username
  const fetchTransactions = useCallback(async () => {
    const user = username || localStorage.getItem('fin_username') || '';
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API}?username=${encodeURIComponent(user)}`, {
        headers: { 'x-username': user },
        timeout: 5000
      });
      setTransactions(Array.isArray(res.data) ? res.data : []);
      setBackendStatus('connected');
    } catch (error) {
      console.error('Fetch error:', error.message);
      setBackendStatus('error');
    } finally {
      setLoading(false);
    }
  }, [username]);

  // Initial backend check and fetch whenever username changes
  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Add transaction with username
  const addTransaction = async (data) => {
    const user = username || localStorage.getItem('fin_username') || '';
    try {
      const payload = { ...data, username: user };
      const res = await axios.post(API, payload, {
        headers: { 'x-username': user }
      });
      setTransactions(prev => [res.data, ...prev]);
      setBackendStatus('connected');
    } catch (error) {
      console.error('Add error:', error.message);
      setBackendStatus('error');
    }
  };

  // Update
  const updateTransaction = async (id, data) => {
    const user = username || localStorage.getItem('fin_username') || '';
    try {
      const res = await axios.put(`${API}/${id}`, data, {
        headers: { 'x-username': user }
      });
      setTransactions(prev => prev.map(t => t._id === id ? res.data : t));
      setBackendStatus('connected');
    } catch (error) {
      console.error('Update error:', error.message);
      setBackendStatus('error');
    }
  };

  // Delete
  const deleteTransaction = async (id) => {
    const user = username || localStorage.getItem('fin_username') || '';
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { 'x-username': user }
      });
      setTransactions(prev => prev.filter(t => t._id !== id));
      setBackendStatus('connected');
    } catch (error) {
      console.error('Delete error:', error.message);
      setBackendStatus('error');
    }
  };

  // Single transaction
  const getById = (id) => transactions.find(t => String(t._id) === String(id));

  // Summary calculated for current user
  const getSummary = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      loading,
      backendStatus,
      checkBackend,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getById,
      getSummary,
      fetchTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);