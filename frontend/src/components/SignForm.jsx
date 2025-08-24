import { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function SignForm({ onSigned }) {
  const { primaryWallet } = useDynamicContext();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Check capability by signMessage existence
  const canSign = !!primaryWallet && typeof primaryWallet.signMessage === 'function' && message.trim().length > 0;

  const signAndVerify = async (e) => {
    e.preventDefault();
    setError('');
    if (!canSign) return;

    try {
      setBusy(true);

      // Sign message using Dynamic wallet
      const signature = await primaryWallet.signMessage(message);

      // Send to backend for verification
      const resp = await fetch(`${BACKEND_URL}/verify-signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      });
      const result = await resp.json();

      onSigned?.({
        message,
        signature,
        signer: result.signer || null,
        result,
        createdAt: Date.now(),
      });

      setMessage('');
    } catch (err) {
      setError(err?.message || 'Signing failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={signAndVerify} style={{ marginTop: 16, display: 'grid', gap: 8 }}>
      <label>
        Custom message:
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something to sign..."
          style={{ width: '100%', marginTop: 6 }}
        />
      </label>
      <button type="submit" disabled={!canSign || busy}>
        {busy ? 'Signing…' : 'Sign & Verify'}
      </button>
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {!primaryWallet && <div style={{ color: '#555' }}>Connect & authenticate above to enable signing.</div>}
    </form>
  );
}
