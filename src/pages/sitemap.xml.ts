import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORIES, SITE_URL } from '../consts';

/**
 * sitemap.xml。外部パッケージを追加せず標準機能だけで生成する。
 * 静的ページ、カテゴリー、下書きでない記事だけを列挙する。
 */

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

type Entry = { path: string; lastmod?: Date; priority: string };

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE_URL;
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
  const newest = posts[0]?.data.updatedAt ?? posts[0]?.data.publishedAt;

  const entries: Entry[] = [
    { path: '/', lastmod: newest, priority: '1.0' },
    { path: '/articles/', lastmod: newest, priority: '0.9' },
    { path: '/ai-lab/', priority: '0.8' },
    { path: '/about/', priority: '0.5' },
    ...Object.keys(CATEGORIES).map((category) => ({
      path: `/categories/${category}/`,
      priority: '0.6',
    })),
    ...posts.map((post) => ({
      path: `/articles/${post.id}/`,
      lastmod: post.data.updatedAt ?? post.data.publishedAt,
      priority: '0.8',
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) =>
      [
        '  <url>',
        `    <loc>${escapeXml(new URL(entry.path, origin).href)}</loc>`,
        ...(entry.lastmod ? [`    <lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>`] : []),
        `    <priority>${entry.priority}</priority>`,
        '  </url>',
      ].join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
