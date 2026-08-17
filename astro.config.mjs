// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // canonical URL、sitemap.xml、rss.xml の絶対URL生成に必要。
  // 公開URLを変更したら outputs/TECHNICAL_HANDOFF.md と src/consts.ts も同じ作業内で更新する。
  site: 'https://ai-to-tsukutte-miru.pages.dev',
});
