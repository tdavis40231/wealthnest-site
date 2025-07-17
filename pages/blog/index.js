import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace('.md', ''),
      title: data.title || filename.replace('.md', ''),
      date: data.date || '',
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function BlogIndex({ posts }) {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">WealthNest Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">Articles coming soon.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(({ slug, title, date }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <a className="text-xl font-semibold text-blue-600 hover:underline">
                  {title}
                </a>
              </Link>
              <p className="text-sm text-gray-500">{date}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}