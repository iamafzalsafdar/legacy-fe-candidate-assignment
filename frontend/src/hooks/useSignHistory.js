import { useEffect, useState } from 'react';

const KEY = 'sign-history:v1';

export default function useSignHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  const addEntry = (item) => setHistory((h) => [item, ...h].slice(0, 100));
  const clearHistory = () => setHistory([]);

  return { history, addEntry, clearHistory };
}
