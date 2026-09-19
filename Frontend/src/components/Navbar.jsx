import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext.jsx';

// props mein username lo
export default function Navbar({ username }) {
    const { darkMode, toggleDarkMode } = useDarkMode();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-semibold border-b-2 border-white pb-1'
      : 'text-indigo-200 hover:text-white transition';

  return (
    <nav className="bg-indigo-600 dark:bg-gray-900 px-6 py-4 flex gap-8 items-center shadow-md">
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
      <NavLink to="/add" className={linkClass}>+ Add</NavLink>
      <button
        onClick={toggleDarkMode}
        className="ml-auto bg-indigo-800 hover:bg-indigo-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}