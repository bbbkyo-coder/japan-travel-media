# Japan by Interest（日本旅行メディア）

アメリカ人を中心とした英語圏の旅行者向けに、「興味から日本を探す」旅行メディアサイト。
Astro + Markdown で作られており、記事はすべて Markdown ファイルを追加するだけで増やせます。

- 収益導線: 旅行アフィリエイト / Etsyデジタルガイド・POD冊子販売
- 技術: Astro (TypeScript) + Markdown（Content Collections）+ Cloudflare Workers

このREADMEは、Web開発の専門知識がない方でも運用できるように書いています。

---

## 1. 開発を始める（ローカルで起動する）

初回のみ依存パッケージをインストールします。

```bash
npm install
```

開発サーバーを起動します（保存すると自動でブラウザに反映されます）。

```bash
npm run dev
```

ブラウザで `http://localhost:4321` を開くと確認できます。止めるときはターミナルで `q` + Enter、または `Ctrl+C`。

本番用にビルドして確認したいとき:

```bash
npm run build
npm run preview
```

`npm run build` が正常終了しなければ、公開してはいけません。エラーメッセージを読み、直してから再実行してください。

---

## 2. 記事を追加する方法

記事は `src/content/articles/` の中に **Markdownファイルを1つ追加するだけ** で公開されます。コードを書き換える必要はありません。

### 手順

1. `src/content/articles/` の中の既存ファイル（例: `sacred-places-japan.md`）をコピーする。
2. ファイル名を新しい記事のURLにする（例: `best-onsen-towns-japan.md` → URLは `/onsen/best-onsen-towns-japan/` になります）。
   - ファイル名は **半角英数字・ハイフンのみ**、日本語やスペースは使わないでください。
3. ファイル先頭の `---` で囲まれた部分（frontmatter）を書き換える。
4. 本文（`---` の下）を書き換える。
5. `npm run dev` で表示を確認し、問題なければGitHubに反映する（本書「6. GitHubへの反映方法」参照）。

### frontmatterの主な項目

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| `title` | ○ | 記事タイトル |
| `description` | ○ | 検索結果やSNSに表示される説明文（120字前後推奨） |
| `intro` | ○ | 見出しの直下に表示される導入文（1〜3段落、空行で段落分け） |
| `category` | ○ | `food` / `spiritual` / `seasons` / `onsen` / `hidden-japan` / `tradition` のいずれか |
| `tags` | - | 興味キーワードの配列（例: `['Ramen', 'Sake']`） |
| `publishedDate` | ○ | 公開日（`2026-09-05` の形式） |
| `updatedDate` | - | 更新日。情報を修正したら都度更新すると信頼性が上がります |
| `heroImage` | - | ヒーロー画像のパス（例: `/images/articles/xxx.jpg`）。未設定ならプレースホルダーが表示されます |
| `heroImageAlt` | - | 画像の代替テキスト（アクセシビリティ・SEO用） |
| `featured` | - | `true` にするとトップページ「Featured Guides」に表示されやすくなる |
| `draft` | - | `true` にすると本番ビルドに含まれない（下書き用） |
| `etsyProductUrl` | - | この記事専用のEtsy商品URL。未設定なら記事末尾のEtsy CTAは非表示 |
| `affiliateEnabled` | - | `false` にするとこの記事だけアフィリエイト/EtsyのCTAを非表示にできる |
| `destinations` | - | 「10選」形式の記事で使う、スポットごとの構造化データ（下記参照） |
| `faq` | - | よくある質問（`question` / `answer` の配列）。実際にFAQがある記事だけ設定してください |
| `relatedSlugs` | - | 関連記事として明示的に指定したい記事のファイル名（拡張子なし）の配列。省略すると同じカテゴリーの新しい記事が自動で表示されます |

`destinations` は「10選」タイプの記事で使う配列です。1項目の例:

```yaml
destinations:
  - name: Fushimi Inari Taisha
    japaneseName: 伏見稲荷大社
    prefecture: Kyoto
    region: Kansai
    whyVisit: なぜ訪れるべきか
    bestFor: ['写真好き', '早起きな人']
    bestSeason: Year-round
    suggestedDuration: 2-3 hours
    highlights: ['見どころ1', '見どころ2']
    localFood: ['ご当地グルメ']
    culturalNotes: 文化的な注意点
    travelTips: 旅の実用情報
    nearbyDestinations: ['近くの観光地']
```

`name` 以外はすべて省略可能です。「Japan Through the Four Seasons」のように10選形式でない記事は、`destinations` を省略して本文（Markdown）だけで書けます。

**既存の3記事（`sacred-places-japan.md` / `best-food-regions-japan.md` / `japan-four-seasons.md`）をテンプレートとしてコピーするのが一番簡単です。**

### 重要：情報の正確性について

営業時間・料金・交通手段・予約方法・季節イベントの日付など、**変わりやすい情報を憶測で書かないでください**。まだ調査していない情報は本文中に

```markdown
> ⚠ この情報は要確認です。最新の情報に差し替えてください。
```

のような引用（`>`）で目立たせる運用にしています（デザイン側で自動的に強調表示されます）。

---

## 3. 画像を追加する方法

1. 画像ファイル（WebP推奨、JPG/PNGも可）を `public/images/` に入れる（フォルダがなければ作成してください）。
2. 記事のfrontmatterで `heroImage: /images/ファイル名.webp` のように指定する。

画像はできるだけ軽量なものを使ってください（目安: 1枚300KB以下）。`public/` に置いたファイルはURLがそのままファイルパスになります。

現在、画像圧縮やAstroの自動最適化（`astro:assets`）は未導入です。将来的に記事数・画像数が増えてきたら導入を検討してください。

---

## 4. カテゴリーを追加・編集する方法

カテゴリーは `src/config/categories.ts` の配列で管理されています。名前・説明文・トップページでの見出しはこのファイルを直接編集してください。

新しいカテゴリーを追加する場合は、2箇所を変更する必要があります。

1. `src/config/categories.ts` に新しいオブジェクトを追加する。
2. `src/content.config.ts` の `categorySlugs` 配列に同じ `slug` を追加する。

この2つが一致していないとビルドエラーになります。

---

## 5. Etsyリンクを変更する方法

- サイト全体のEtsyショップURL: `src/config/etsy.ts` の `shopUrl` を編集。
- 記事ごとのEtsy商品URL: その記事のfrontmatterの `etsyProductUrl` を編集。

**どちらも空欄のままなら、Etsyへの誘導ボタンは自動的に非表示になります**（リンク切れを防ぐための仕様です）。架空のURLを入力しないでください。

---

## 6. アフィリエイトリンクを設定する方法

`src/config/affiliate.ts` を編集してください。

```ts
export const affiliateConfig = {
  hotels: { url: '', label: 'Search Hotels', description: '...' },
  tours: { url: '', label: 'Find Tours & Activities', description: '...' },
  transportation: { url: '', label: 'Plan Your Transportation', description: '...' },
};
```

各 `url` に実際のアフィリエイトリンクを入れてください。**提携していないサービスのURLは絶対に空欄のままにしておいてください**（未設定の間はCTAが自動的に非表示になります）。

全体で一時的にアフィリエイトを止めたい場合は、同じファイルの `affiliateGloballyEnabled` を `false` にしてください。

---

## 7. サイトタイトル・基本情報を変更する方法

`src/config/site.ts` を編集してください。

- `title` / `shortTitle`: サイト名
- `description`: サイトの説明文（SEO・トップページで使用）
- `url`: **本番公開前に必ず実際のドメインに書き換えてください。** sitemap.xml・canonical URL・OGP画像URLなどすべてここを基準に生成されます。
- `twitterHandle`: X（Twitter）アカウントがあれば設定

---

## 8. アクセス解析（Google Analytics / Search Console）を追加する方法

1. `.env.example` を `.env` にコピーする。
2. `.env` に `PUBLIC_GA_MEASUREMENT_ID`（Google AnalyticsのID）や `PUBLIC_GSC_VERIFICATION`（Search Console確認コード）を入力する。
3. 保存してビルドし直す。

未設定の項目は何も読み込まれません（重いスクリプトが余計に増えることはありません）。`.env` はGitに含まれないので、Cloudflareにデプロイする場合は後述の環境変数設定にも同じ値を入れてください。

---

## 9. GitHubへの反映方法

GitHub連携・Cloudflareへの自動デプロイは設定済みです。
リポジトリ: https://github.com/bbbkyo-coder/japan-travel-media

変更を反映したいときは、この3行を実行するだけです（`main`ブランチへのpushで自動的にビルド・公開されます）。

```bash
git add .
git commit -m "変更内容がわかる一言"
git push
```

---

## 10. Cloudflareへの公開方法

2026年現在、Cloudflareは新規サイトに **Cloudflare Workers**（Pagesではなく）を推奨しています。このプロジェクトはWorkers向けに設定済みです（`wrangler.jsonc`）。

**GitHub連携による自動デプロイは設定済みです。** `git push` するだけで、Cloudflareダッシュボードの「Workers & Pages → japan-travel-media → デプロイ」タブに反映が進みます（数十秒でビルド完了）。

手元から直接デプロイしたい場合（緊急時など）:

```bash
npm run build
npx wrangler deploy
```

### 独自ドメインの設定

Cloudflareダッシュボードの対象Workerの「Settings → Domains & Routes」から独自ドメインを追加してください。ドメインを決めたら、必ず `src/config/site.ts` の `url` もそのドメインに書き換えてください。

---

## 11. ファイル構成

```
src/
├── components/       再利用可能な部品（Header, ArticleCard, Commentsなど）
├── config/           サイト全体の設定（カテゴリー、アフィリエイト、Etsy、サイト情報）
├── content/
│   ├── articles/     記事のMarkdownファイル ← 主にここを編集
│   └── pages/        About/Privacy Policyなど固定ページのMarkdown
├── content.config.ts 記事frontmatterの型定義（スキーマ）
├── layouts/          ページの土台となるレイアウト
├── pages/
│   ├── api/          コメント機能のAPI（動的、静的生成されない）
│   ├── admin/         コメント承認画面（動的、要パスワード）
│   └── [category]/    記事・カテゴリー一覧ページ
├── styles/           デザインの基本設定（色・フォントはglobal.cssのCSS変数で管理）
└── utils/            読了時間の計算などの小さな関数
db/
└── schema.sql        コメント機能のデータベース定義
```

---

## 12. コメント機能について

記事の一番下に、読者がコメントを書ける欄があります。**投稿されたコメントは自動公開されず、管理者の承認後に表示されます**（スパム・不適切な投稿を防ぐため）。

### 承認する方法

以下のURLをブックマークしてください（`キー`の部分は実際の管理用パスワードに置き換えてください。パスワードはこのプロジェクトのセットアップ時に発行したもので、`.dev.vars`ファイル、またはCloudflareダッシュボードの Workers & Pages → japan-travel-media → 設定 → Variables and Secrets で確認・再発行できます）:

```
https://（あなたのドメイン）/admin/comments/?key=キー
```

「Pending」に未承認コメントが並ぶので、「Approve」で公開、「Delete」で削除できます。このページは検索エンジンにインデックスされないよう設定済みです。

### ローカルでコメント機能ごと確認したいとき

コメント機能はCloudflareのデータベース（D1）を使うため、`npm run dev`（Astro単体）では動きません。代わりに以下を使ってください。

```bash
npm run dev:worker
```

初回だけ、ローカル用データベースにテーブルを作成しておく必要があります。

```bash
npx wrangler d1 execute japan-travel-media-comments --local --file=./db/schema.sql
```

---

## 13. 現在未実装のもの（意図的にMVP範囲外）

- 会員登録・ログイン・決済（Etsyを販売の場として利用する前提）
- メールマガジン機能（`NewsletterPlaceholder` コンポーネントで見た目だけ用意済み）
- 記事内画像の自動最適化（`astro:assets`）
- 検索機能・タグ別一覧ページ

これらは記事数やアクセスが増えてから、必要になったタイミングで追加することを想定しています。
