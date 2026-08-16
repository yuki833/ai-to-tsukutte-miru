export const SITE_TITLE = 'AIと、つくってみる。';
export const SITE_DESCRIPTION =
  'AIで仕事や暮らしの困りごとを解決し、アイデアを形にする過程を紹介する実践ブログ。';

export const CATEGORIES = {
  start: { label: 'はじめてのAI', description: '最初の質問から安全な使い方まで、迷わず始めるための入口。' },
  work: { label: '仕事で使う', description: '文章、資料、調査や小さな仕事をAIで少し楽にする。' },
  life: { label: '暮らし・趣味', description: '旅行、料理、学びや創作など、身近なことにAIを取り入れる。' },
  tools: { label: 'AIツールと使い方', description: 'AIでできること、使ったツール、プロンプトを分かりやすく紹介する。' },
  try: { label: 'AIでつくってみた', description: 'AIと一緒に手を動かし、完成までの試行錯誤をそのまま記録する。' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
