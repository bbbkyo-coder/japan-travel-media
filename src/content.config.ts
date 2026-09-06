import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * カテゴリーの正式なslug一覧。
 * src/config/categories.ts の CategorySlug と必ず一致させること。
 */
const categorySlugs = [
  'food',
  'spiritual',
  'seasons',
  'onsen',
  'hidden-japan',
  'tradition',
] as const;

/**
 * 「10選」記事などで使う、1スポット分のデータ構造。
 * 季節記事のように地理情報を持たない項目にも流用できるよう、
 * ほぼ全フィールドを任意（optional）にしている。
 *
 * name 以外は必須にしない（指示書 13. の通り）。
 */
const destinationSchema = z.object({
  name: z.string(),
  japaneseName: z.string().optional(),
  prefecture: z.string().optional(),
  region: z.string().optional(),
  whyVisit: z.string().optional(),
  bestFor: z.array(z.string()).optional(),
  bestSeason: z.string().optional(),
  suggestedDuration: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  localFood: z.array(z.string()).optional(),
  culturalNotes: z.string().optional(),
  travelTips: z.string().optional(),
  nearbyDestinations: z.array(z.string()).optional(),
  accommodationCtaLabel: z.string().optional(),
  experienceCtaLabel: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Hero直下に表示する導入文（1〜3段落程度のプレーンテキスト、空行で段落分け）
    intro: z.string(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Etsyの特定商品ページへ直接リンクしたい場合に設定（任意）
    etsyProductUrl: z.string().url().optional(),
    // この記事でアフィリエイトCTAを出すかどうか
    affiliateEnabled: z.boolean().default(true),
    destinations: z.array(destinationSchema).optional(),
    faq: z.array(faqItemSchema).optional(),
    // 未設定なら title / description をそのままSEOに使う
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { articles, pages };
