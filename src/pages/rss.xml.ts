import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts';

/**
 * RSS 2.0 フィード。外部パッケージを追加せず標準機能だけで生成する。
 * 本文全文は配信せず、タイトル・説明・公開日・リンクだけを出す。
 */

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? SITE_URL;
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  const items = posts
    .map((post) => {
      const link = new URL(`/articles/${post.id}/`, origin).href;
      return [
        '    <item>',
        `      <title>${escapeXml(post.data.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(post.data.description)}</description>`,
        `      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>`,
        ...post.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const latest = posts[0]?.data.publishedAt ?? new Date(0);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${escapeXml(new URL('/', origin).href)}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    '    <language>ja</language>',
    `    <managingEditor>${escapeXml(SITE_AUTHOR)}</managingEditor>`,
    `    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(new URL('/rss.xml', origin).href)}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
