# 0001: Next.js 静的エクスポート + microCMS + Amplify を採用

- Status: Accepted
- Date: 2026-03-31

## Context

- ブログ記事は microCMS で管理している
- 配信は AWS Amplify で運用している
- SEO と表示速度の観点で静的配信を優先したい
- 運用コストと保守の単純さを重視したい

## Decision

以下の構成を採用する。

- Next.js App Router を利用する
- `output: "export"` で静的サイトを生成する
- `next-image-export-optimizer` で画像をビルド時最適化する
- Amplify で `out/` を配信する

## Consequences

### Positive

- CDN 配信で高速かつ安定した表示ができる
- サーバ常駐コストを抑えられる
- デプロイ構成が単純になる

### Negative / Trade-off

- リクエスト時の動的レンダリングは使えない
- 公開反映は再ビルドが必要
- 画像最適化の責務がビルド時間に寄る

## Notes

- microCMS 連携には `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を使用する
- 画像取得対象は `remoteOptimizedImages.js` で microCMS から収集する

## Related

- `my-blog/next.config.ts`
- `my-blog/remoteOptimizedImages.js`
- `amplify.yml`
