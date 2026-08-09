export const SITE_TITLE = 'AIと、つくってみる。';
export const SITE_DESCRIPTION =
  'AIに興味はあるけれど、何から始めればいいか分からない人へ。AIを一緒に使い、できることを増やす実践ブログ。';

export const CATEGORIES = {
  start: { label: 'はじめてのAI', description: '最初の質問から安全な使い方まで、迷わず始めるための入口。' },
  work: { label: '仕事で使う', description: 'メール、資料、Excelなど、毎日の仕事をAIで少し楽にする。' },
  life: { label: '暮らし・趣味', description: '旅行、料理、学びや創作。身近なことにAIを取り入れる。' },
  tools: { label: 'AIツール図鑑', description: 'できることや難しさを同じ基準で比べ、初心者目線で紹介する。' },
  try: { label: 'AIでつくってみた', description: 'AIと一緒に手を動かし、完成までの試行錯誤をそのまま記録する。' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
