/**
 * Etsy導線の設定。
 *
 * shopUrl: Etsyショップ全体のURL（例: 'https://www.etsy.com/shop/YourShopName'）。
 * 商品ごとのURLは各記事のfrontmatter `etsyProductUrl` で個別に設定できます。
 *
 * どちらも未設定の場合、<EtsyCTA> は表示されません
 * （リンク切れ・架空リンクを避けるための安全策）。
 */
export const etsyConfig = {
  shopUrl: '',
  defaultHeading: 'Want to take this guide with you?',
  defaultBody:
    'The free guide helps you decide where to go. The printable Etsy guide is built for using on the trip itself — checklists, maps, and planning pages you can take offline.',
  defaultCtaLabel: 'Get the Complete Travel Guide',
};
