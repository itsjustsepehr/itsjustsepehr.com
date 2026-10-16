import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts } from '../lib/posts';
import { href } from '../lib/site';
export async function GET(context: APIContext) {
  return rss({ title: 'itsjustsepehr — Writing', description: 'Software engineering notes in English and Persian.', site: context.site!, items: (await publishedPosts()).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: href(`writing/${post.id}/`), categories: [post.data.category, ...post.data.tags] })) });
}
