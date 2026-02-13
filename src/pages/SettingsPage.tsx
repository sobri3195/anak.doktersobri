import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { exportBackup, resetAllData } from '../utils/storage';

export const SettingsPage = () => {
  const state = useAppStore();
  const [raw, setRaw] = useState('');

  return (
    <section>
      <h1>Settings & Safety</h1>
      <p><b>Medical Disclaimer:</b> Aplikasi ini hanya untuk catatan dan edukasi, bukan pengganti keputusan dokter.</p>
      <button onClick={() => navigator.clipboard.writeText(exportBackup(state))}>Copy Export JSON</button>
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="Paste JSON backup" />
      <button onClick={() => state.importAll(raw)}>Import Restore</button>
      <button onClick={() => useAppStore.setState(resetAllData())}>Reset Data</button>
    </section>
  );
};
