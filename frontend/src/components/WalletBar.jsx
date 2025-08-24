import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function WalletBar() {
  const { primaryWallet, user } = useDynamicContext();
  const addr = primaryWallet?.address;
  const chain = primaryWallet?.chain;

  // Instead of isEthereumWallet, just check if the wallet can sign
  const isEvmCapable = typeof primaryWallet?.signMessage === 'function';

  return (
    <div style={{ marginTop: 12, padding: 12, border: '1px solid #e3e3e3', borderRadius: 8 }}>
      <div><strong>Status:</strong> {user ? 'Authenticated' : 'Not authenticated'}</div>
      <div><strong>Wallet connected:</strong> {primaryWallet ? 'Yes' : 'No'}</div>
      <div><strong>Chain:</strong> {primaryWallet ? chain : '-'}</div>
      <div><strong>Address:</strong> {addr || '-'}</div>
      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        {primaryWallet ? (isEvmCapable ? 'Signing available' : 'Signing unavailable') : ''}
      </div>
    </div>
  );
}
