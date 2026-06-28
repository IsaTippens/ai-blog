import matter from 'gray-matter';

export async function load() {
  const postFiles = import.meta.glob('../../posts/*.md', { eager: true, query: '?raw' });

  const posts = Object.entries(postFiles).map(([path, file]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const { data } = matter(file.default);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      categories: data.categories || []
    };
  });

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { posts };
}
