import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default function BlogPost({ title, date, content }) {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-6">{date}</p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    props: {
      title: data.title || params.slug,
      date: data.date || '',
      content: processedContent.toString(),
    },
  };
}
