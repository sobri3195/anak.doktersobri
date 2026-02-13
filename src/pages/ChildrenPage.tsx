import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const ChildrenPage = () => {
  const { children, addChild, removeChild } = useAppStore();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  return (
    <section>
      <h1>Daftar Anak</h1>
      <form onSubmit={(e) => { e.preventDefault(); addChild({ name, dob, sex: 'male', preterm: false }); setName(''); setDob(''); }}>
        <input placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <button>Tambah</button>
      </form>
      {children.map((c) => (
        <article key={c.id}>
          <Link to={`/anak/${c.id}`}>{c.name}</Link>
          <small>{c.dob.slice(0,10)}</small>
          <button onClick={() => removeChild(c.id)}>Hapus</button>
        </article>
      ))}
    </section>
  );
};
