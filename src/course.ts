// 基礎講座の目次。正本は outputs/AI_COURSE_CURRICULUM.md（第4版・DEC-074・DEC-076・DEC-077）。
// postId は src/content/posts のファイル名。まだ書いていない回は null（目次に「準備中」と出す）。
// 回を公開したら、その回の postId にファイル名を入れる（AI_COURSE_CURRICULUM.md 6節の5）。
// 題名は案。書く前に、題名の言葉の検索数を測って決める（同 2節）。

export const COURSE_NAME = '生成AI 基礎講座';

export const COURSE_PROMISE =
  '生成AIを自分で開いて、困りごとを相談し、返ってきた答えを確かめてから使える。入れてはいけない情報も分かっている。使うAIが変わっても、同じ考え方で使える。';

export type Lesson = { no: number; title: string; postId: string | null };
export type Chapter = { no: number; title: string; goal: string; lessons: Lesson[] };

export const COURSE: Chapter[] = [
  {
    no: 1,
    title: 'はじめての生成AI',
    goal: 'その場で1つ頼んで、役に立つ答えをもらえる。得意・苦手と、入れてはいけないものが分かる。',
    lessons: [
      { no: 1, title: '生成AIとは？ まずは1つ質問してみよう', postId: 'generative-ai-first-question' },
      { no: 2, title: '分からない言葉や文章を、自分向けに説明してもらう', postId: null },
      { no: 3, title: '生成AIが得意なこと・苦手なことと、入れてはいけないもの', postId: null },
    ],
  },
  {
    no: 2,
    title: '伝え方の基本',
    goal: '何に使うかを決め、材料と返してほしい形を伝え、会話しながら直せる。',
    lessons: [
      { no: 4, title: '頼む前に「何に使うか・どうなれば十分か」を決める', postId: null },
      { no: 5, title: '材料を渡す｜知らないことを勝手に作らせない', postId: null },
      { no: 6, title: '答えの長さ・形・言葉づかいを指定する', postId: null },
      { no: 7, title: '一度で完成させない｜会話しながら直していく', postId: null },
    ],
  },
  {
    no: 3,
    title: '答えを信じすぎない',
    goal: '間違いと抜けを見つけ、使うかどうかを自分で決められる。うまくいかないときに立て直せる。',
    lessons: [
      { no: 8, title: '生成AIは嘘をつく？ もっともらしい間違いと抜け', postId: null },
      { no: 9, title: '答えを確かめて、使うかどうかを自分で決める', postId: null },
      { no: 10, title: 'うまくいかないときの立て直し方', postId: null },
    ],
  },
  {
    no: 4,
    title: '誰にでも使える頼み方',
    goal: '暮らしでも仕事でも使える頼み方を、自分の困りごとに当てはめられる。',
    lessons: [
      { no: 11, title: '散らかったことを、一覧と順番に整理してもらう', postId: null },
      { no: 12, title: '迷ったら、比べてもらう・案を出してもらう', postId: null },
      { no: 13, title: '自分のメモから、たたき台を作ってもらう', postId: null },
    ],
  },
  {
    no: 5,
    title: '自分で使い続ける',
    goal: '自分なりの使い方を持ち、上達したことを確かめる。',
    lessons: [
      { no: 14, title: '写真を見せる・声で話しかける', postId: null },
      { no: 15, title: 'よく使う頼み方を、自分用にメモしておく', postId: null },
      { no: 16, title: '修了：最初と同じ質問をもう一度する', postId: null },
    ],
  },
];

// 講座の回とは別の、参照用の記事（ChatGPTの始め方）。書いたら postId を入れる。
export const REFERENCE = { title: 'ChatGPTの始め方｜登録しなくても使える。最初の画面の見方', postId: null as string | null };

// 基礎講座のあとに読む「用途別の実践編」。公開中の記事のうち、仕事の具体的な場面を扱う10本（DEC-076）。
export const PRACTICE = [
  'ai-confidential-masking',
  'ai-summarize-long-text',
  'ai-meeting-minutes',
  'ai-write-announcement',
  'ai-report-writing',
  'ai-translate-business-email',
  'ai-slide-outline',
  'ai-presentation-slides',
  'ai-powerpoint-rewrite',
  'ai-excel-formula',
];

// 講座の外に置く読み物（ケーススタディ）
export const CASE_STUDIES = [
  'verify-ai-answers',
  'why-start-ai-blog',
  'ai-blog-start',
  'ai-blog-review',
  'ai-built-yohaku-price-check',
  'why-small-business-pricing-is-hard',
];

const FLAT = COURSE.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c })));

/** 記事IDから、基礎講座のどの回か・前後の公開済みの回を引く。講座に入っていなければ null。 */
export function findLesson(postId: string) {
  const i = FLAT.findIndex((l) => l.postId === postId);
  if (i < 0) return null;
  const published = FLAT.filter((l) => l.postId);
  const j = published.findIndex((l) => l.postId === postId);
  return {
    lesson: FLAT[i],
    prev: j > 0 ? published[j - 1] : null,
    next: j < published.length - 1 ? published[j + 1] : null,
  };
}

export const LESSON_COUNT = FLAT.length;
export const PUBLISHED_LESSON_COUNT = FLAT.filter((l) => l.postId).length;
