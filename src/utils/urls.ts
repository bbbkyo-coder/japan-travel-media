import type { CollectionEntry } from 'astro:content';

/** 記事のURLを組み立てる。カテゴリー + 記事id（=ファイル名）でパスが決まる。 */
export function articleUrl(article: CollectionEntry<'articles'>): string {
  return `/${article.data.category}/${article.id}/`;
}

export function categoryUrl(slug: string): string {
  return `/${slug}/`;
}

/** YYYY-MM-DD 形式で表示用に日付をフォーマット（タイムゾーン依存を避けるためUTC固定） */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
