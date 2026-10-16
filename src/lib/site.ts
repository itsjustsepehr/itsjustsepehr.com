export const categories = [
  { slug: 'artificial-intelligence', name: 'Artificial Intelligence', description: 'Understanding the tools changing how we build software.' },
  { slug: 'web-development', name: 'Web Development', description: 'Thoughtful interfaces and the systems behind them.' },
  { slug: 'banking-systems', name: 'Banking Systems', description: 'Correctness, resilience, and trust in financial software.' },
  { slug: 'software-architecture', name: 'Software Architecture', description: 'Boundaries, trade-offs, and systems built to evolve.' },
  { slug: 'engineering', name: 'Engineering', description: 'Practical lessons from the everyday work of building.' },
] as const;
export const categorySlugs = categories.map(c => c.slug) as [string, ...string[]];
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const categoryName = (slug: string) => categories.find(c => c.slug === slug)?.name || slug;
