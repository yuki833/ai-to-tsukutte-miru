export const SITE_TITLE = 'AIと、つくってみる。';
export const SITE_DESCRIPTION =
  'AI初心者が、学びながら実際に使ってみる過程を記録するブログ。';

export const CATEGORIES = {
  learn: { label: 'AIを学ぶ', description: '難しい言葉をひとつずつ、自分の言葉で理解する。' },
  try: { label: 'AIを使ってみた', description: 'AIと一緒に、実際に何かを作ってみた記録。' },
  tools: { label: 'AIツール', description: '気になるAIツールを、初心者目線で試して紹介。' },
  news: { label: 'AIニュース', description: '知っておきたい変化を、やさしく整理する。' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
