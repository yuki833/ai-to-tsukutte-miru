export const SITE_TITLE = 'AIと、つくってみる。';
export const SITE_DESCRIPTION =
  'AIで仕事や暮らしの困りごとを解決し、アイデアを形にする過程を紹介する実践ブログ。';

// astro.config.mjs の site と同じ値。Astro.site が未定義の場合のフォールバックに使う。
export const SITE_URL = 'https://ai-to-tsukutte-miru.pages.dev';
export const SITE_AUTHOR = 'ユキ';
export const SITE_LOCALE = 'ja_JP';
export const SITE_X_HANDLE = '@yuki_ai_tsukuru';

// Bing Webmaster Tools のサイト所有権確認コード。
// Bingの「HTMLメタタグ」方式で表示される content の値だけをここへ入れる。
// 例: <meta name="msvalidate.01" content="ABC123..." /> なら 'ABC123...' の部分。
// 空文字のときはタグを出力しない。秘密情報ではないが、アカウント由来の値なので
// 文書やログへは書かない（SAFE-01）。
export const BING_SITE_VERIFICATION = 'C058177F68DA892C4270A29503A02EEC';

// Google Search Console のサイト所有権確認コード。
// Search Consoleの「HTMLタグ」方式で表示される content の値だけをここへ入れる。
// 例: <meta name="google-site-verification" content="ABC123..." /> なら 'ABC123...' の部分。
// 空文字のときはタグを出力しない。扱いは Bing と同じ（SAFE-01）。
export const GOOGLE_SITE_VERIFICATION = 'L00MyHArE7fVl9XqMM2M49fgajpoTcXY4oepTcaN9fo';

// SNSと検索結果で使うカード画像。1200x630のPNGだけを指定する（SVGはX・Facebookが表示しない）。
export const DEFAULT_OG_IMAGE = '/og/default.png';

// 記事ごとのカード画像。新しい記事を追加したら1行足す。
// 未登録の記事は DEFAULT_OG_IMAGE を使う。
// 登録漏れと実ファイル欠落は `node scripts/check-workspace.mjs` が検出する。
export const OG_IMAGES: Record<string, string> = {
  'why-start-ai-blog': '/og/why-start-ai-blog.png',
  'ai-blog-start': '/og/ai-blog-start.png',
  'ai-blog-review': '/og/ai-blog-review.png',
  'ai-built-yohaku-price-check': '/og/ai-built-yohaku-price-check.png',
  'why-small-business-pricing-is-hard': '/og/why-small-business-pricing-is-hard.png',
  'verify-ai-answers': '/og/verify-ai-answers.png',
};

export const CATEGORIES = {
  start: { label: 'はじめてのAI', description: '最初の質問から安全な使い方まで、迷わず始めるための入口。' },
  work: { label: '仕事で使う', description: '文章、資料、調査や小さな仕事をAIで少し楽にする。' },
  life: { label: '暮らし・趣味', description: '旅行、料理、学びや創作など、身近なことにAIを取り入れる。' },
  tools: { label: 'AIツールと使い方', description: 'AIでできること、使ったツール、プロンプトを分かりやすく紹介する。' },
  try: { label: 'AIでつくってみた', description: 'AIと一緒に手を動かし、完成までの試行錯誤をそのまま記録する。' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
