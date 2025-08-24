export default function History({ items, onClear }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h3 style={{ margin: 0 }}>Local signing history</h3>
        <button onClick={onClear} disabled={!items.length}>Clear</button>
      </div>
      {!items.length && <div style={{ color: '#777' }}>No messages signed yet.</div>}
      {items.map((it) => (
        <div key={it.createdAt} style={{ marginTop: 12, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: '#666' }}>{new Date(it.createdAt).toLocaleString()}</div>
          <div><strong>Message:</strong> {it.message}</div>
          <div><strong>Signature:</strong> {it.signature}</div>
          <div><strong>Signer (backend):</strong> {it.signer || '-'}</div>
          <div><strong>Valid:</strong> {String(it?.result?.isValid)}</div>
        </div>
      ))}
    </div>
  );
}
