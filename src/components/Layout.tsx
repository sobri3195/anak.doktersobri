import { Link, Outlet } from 'react-router-dom';
import { Activity, BookOpen, Calculator, Home, Moon, Settings, Sun } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const nav = [
  ['/', 'Dashboard', Home],
  ['/anak', 'Anak', Activity],
  ['/growth', 'Growth', Activity],
  ['/obat', 'Obat', BookOpen],
  ['/rumus', 'Rumus', Calculator],
  ['/guideline', 'Guideline', BookOpen],
  ['/settings', 'Settings', Settings],
  ['/about', 'About', BookOpen],
] as const;

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleDarkMode, search, setSearch, children, drugs, guidelines } = useAppStore();

  const globalResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return [
      ...children.filter((c) => c.name.toLowerCase().includes(q)).map((c) => `Anak: ${c.name}`),
      ...drugs.filter((d) => d.name.toLowerCase().includes(q)).map((d) => `Obat: ${d.name}`),
      ...guidelines.filter((g) => g.title.toLowerCase().includes(q)).map((g) => `Guideline: ${g.title}`),
    ].slice(0, 6);
  }, [search, children, drugs, guidelines]);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`.trim()}>
        <button onClick={() => setCollapsed((v) => !v)}>☰</button>
        <h2 className="brand">
          <img src="/logo.svg" alt="Logo anak.sobri" />
          {!collapsed && <span>anak.sobri</span>}
          {collapsed && <span>a.s</span>}
        </h2>
        {nav.map(([to, label, Icon]) => <Link key={to} to={to}><Icon size={16} /> {!collapsed && label}</Link>)}
      </aside>
      {mobileOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main>
        <header className="topbar">
          <button className="mobile-menu-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>☰</button>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari anak/obat/guideline/rumus" />
          <div className="quick-actions">
            <button onClick={toggleDarkMode}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
            <Link to="/anak">+ Anak</Link>
            <Link to="/rumus">+ Hitung</Link>
          </div>
        </header>
        {!!globalResults.length && <div className="search-results">{globalResults.map((item) => <p key={item}>{item}</p>)}</div>}
        <Outlet />
      </main>
    </div>
  );
};
