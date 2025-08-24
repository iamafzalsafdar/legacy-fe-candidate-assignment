import { useState } from 'react';
import WalletBar from './components/WalletBar';
import SignForm from './components/SignForm';
import History from './components/History';
import useSignHistory from './hooks/useSignHistory';

export default function App() {
  const [lastResult, setLastResult] = useState(null);
  const { history, addEntry, clearHistory } = useSignHistory();

  const handleSigned = (entry) => {
    addEntry(entry);
    setLastResult(entry.result);
  };

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: '0 16px' }}>
      <WalletBar />
      <SignForm onSigned={handleSigned} />
      {lastResult && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #e3e3e3', borderRadius: 8 }}>
          <strong>Backend result</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(lastResult, null, 2)}</pre>
        </div>
      )}
      <History items={history} onClear={clearHistory} />
    </div>
  );
}
