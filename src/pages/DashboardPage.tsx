import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const DashboardPage = () => {
  const { children, measurements, reminders } = useAppStore();
  const overdue = reminders.filter((r) => !r.done && new Date(r.dueDate) < new Date()).length;
  return (
    <section>
      <h1>Dashboard</h1>
      <div className="grid">
        <article><h3>Anak aktif</h3><strong>{children.length}</strong></article>
        <article><h3>Input terakhir</h3><strong>{measurements.at(-1)?.date?.slice(0,10) ?? '-'}</strong></article>
        <article><h3>Reminder overdue</h3><strong>{overdue}</strong></article>
      </div>
      <div className="grid">
        <Link to="/anak">Tambah data anak</Link>
        <Link to="/growth">Lihat grafik</Link>
        <Link to="/settings">Backup data</Link>
      </div>
    </section>
  );
};
