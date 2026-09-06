/**
 * カテゴリー定義（6カテゴリー固定・MVP範囲）。
 *
 * ここに書いた情報がトップページのカードや各カテゴリー一覧ページの
 * 見出しに使われます。新しいカテゴリーを増やす場合はここに追加し、
 * src/content.config.ts の category enum にも同じ slug を追加してください。
 */
export type CategorySlug =
  | 'food'
  | 'spiritual'
  | 'seasons'
  | 'onsen'
  | 'hidden-japan'
  | 'tradition';

export interface CategoryDefinition {
  slug: CategorySlug;
  /** ナビゲーションや一覧ページで使う短い名前 */
  name: string;
  /** トップページのカードに使うキャッチーな見出し */
  homeTitle: string;
  /** カード・一覧ページ用の短い説明 */
  tagline: string;
  /** カテゴリー一覧ページのヒーロー部分に使う長めの説明 */
  description: string;
  /** このカテゴリーに紐づく興味・キーワード（タグの目安、厳密な制約ではない） */
  interests: string[];
  /** カードの背景に使う画像（任意、未設定ならプレースホルダー表示） */
  image?: string;
  imageAlt?: string;
}

export const categories: CategoryDefinition[] = [
  {
    slug: 'food',
    name: 'Food',
    homeTitle: 'Taste Japan',
    tagline: 'Regional food and culinary travel across Japan.',
    description:
      'From street food stalls to centuries-old regional cuisine, Japan rewards travelers who plan their trip around what they eat. Explore the regions, dishes, and food cultures worth traveling for.',
    interests: ['Japanese Food', 'Ramen', 'Matcha', 'Sake', 'Local Cuisine'],
    image: '/images/categories/food.webp',
    imageAlt: 'Assorted sushi on a black ceramic plate',
  },
  {
    slug: 'spiritual',
    name: 'Spiritual',
    homeTitle: 'Sacred Japan',
    tagline: 'Shrines, temples, and the spiritual side of Japan.',
    description:
      'Japan is home to tens of thousands of shrines and temples, from quiet neighborhood altars to mountains considered sacred for over a thousand years. Discover the places, practices, and history behind spiritual Japan.',
    interests: ['Spiritual Japan', 'Shrines & Temples', 'Zen'],
    image: '/images/categories/spiritual.webp',
    imageAlt: 'A large wooden torii gate at Meiji Jingu shrine in Tokyo',
  },
  {
    slug: 'seasons',
    name: 'Seasons',
    homeTitle: 'Japan Through the Seasons',
    tagline: 'Spring, summer, autumn and winter travel.',
    description:
      'Japan changes dramatically with the seasons — cherry blossoms in spring, festivals in summer, fiery foliage in autumn, and snow country in winter. Time your trip around the season that matches your idea of Japan.',
    interests: ['Sakura', 'Autumn Leaves', 'Japanese Seasons'],
    image: '/images/categories/seasons.webp',
    imageAlt: 'A tree with vivid orange autumn leaves in front of a building',
  },
  {
    slug: 'onsen',
    name: 'Onsen',
    homeTitle: 'Relax in Japan',
    tagline: 'Hot springs and onsen towns worth traveling for.',
    description:
      'Onsen culture is one of the most distinctly Japanese travel experiences. Learn how to visit hot spring towns properly, and find the destinations where the ritual of bathing becomes the whole trip.',
    interests: ['Onsen', 'Wellness'],
    image: '/images/categories/onsen.webp',
    imageAlt: 'Steamy blue onsen bath water with wooden bath implements',
  },
  {
    slug: 'hidden-japan',
    name: 'Hidden Japan',
    homeTitle: 'Discover Hidden Japan',
    tagline: 'Beautiful places beyond Tokyo, Kyoto and Osaka.',
    description:
      'Beyond the standard Tokyo–Kyoto–Osaka route lies a quieter Japan of countryside towns, scenic train lines, and landscapes most first-time visitors never see. This is where to go when you want to go deeper.',
    interests: ['Hidden Japan', 'Countryside Japan', 'Scenic Train Travel', 'Nature'],
    image: '/images/categories/hidden-japan.webp',
    imageAlt: 'A traditional wooden house in a green countryside field',
  },
  {
    slug: 'tradition',
    name: 'Tradition',
    homeTitle: 'Experience Traditional Japan',
    tagline: 'Traditional towns, crafts, castles and festivals.',
    description:
      'From preserved Edo-period towns to castles, crafts, and festivals passed down for generations, traditional Japan is very much alive. Explore the culture and history still shaping the country today.',
    interests: ['Traditional Culture', 'Japanese Festivals', 'Castles', 'Traditional Towns'],
    image: '/images/categories/tradition.webp',
    imageAlt: 'Kinkaku-ji, the golden pavilion, reflected in its pond in Kyoto',
  },
];

export function getCategory(slug: string): CategoryDefinition | undefined {
  return categories.find((c) => c.slug === slug);
}
