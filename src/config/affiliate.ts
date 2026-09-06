/**
 * アフィリエイト設定。
 *
 * 重要：まだ提携（アフィリエイトID発行）が済んでいないサービスの
 * URLを絶対に想像で埋めないこと。空文字 '' のままにしておけば、
 * <AffiliateCTA> は自動的にそのCTAを非表示にします。
 *
 * 提携が決まったら、それぞれの `url` に実際のアフィリエイトリンクを
 * 設定してください（例: Booking.comのアフィリエイトタグ付きURLなど）。
 */
export type AffiliateKind = 'hotels' | 'tours' | 'transportation';

export interface AffiliateLink {
  /** 実際のアフィリエイトURL。未提携なら空文字のまま。 */
  url: string;
  label: string;
  description: string;
}

export const affiliateConfig: Record<AffiliateKind, AffiliateLink> = {
  hotels: {
    url: '',
    label: 'Search Hotels',
    description: 'Compare places to stay near this destination.',
  },
  tours: {
    url: '',
    label: 'Find Tours & Activities',
    description: 'Book guided experiences and activities in the area.',
  },
  transportation: {
    url: '',
    label: 'Plan Your Transportation',
    description: 'Look into trains, passes, and getting around Japan.',
  },
};

/** サイト全体でアフィリエイトCTAを一括ON/OFFする場合はここをfalseに */
export const affiliateGloballyEnabled = true;
