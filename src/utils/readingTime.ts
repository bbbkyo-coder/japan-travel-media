const WORDS_PER_MINUTE = 200;

/** Markdown本文からおおよその読了時間を計算する（ビルド時のみ実行、JS配信なし） */
export function estimateReadingTime(rawBody: string): string {
  const words = rawBody
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
