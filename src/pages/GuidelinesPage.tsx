import { useAppStore } from '../store/useAppStore';

export const GuidelinesPage = () => {
  const { guidelines } = useAppStore();
  return <section><h1>Guideline Library</h1>{guidelines.map((g) => <article key={g.id}><h3>{g.title}</h3><p>{g.summary}</p><small>{g.tags.join(', ')}</small></article>)}</section>;
};
