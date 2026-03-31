# my-blog (App)

`my-blog` ディレクトリ配下の Next.js アプリ本体に関する README です。
プロジェクト全体の説明はルート `README.md` を参照してください。

## 必要環境

- Node.js 20 以上推奨
- npm

## 環境変数

`.env.local` を作成して以下を設定:

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

## npm scripts

- `npm run dev`: 開発サーバ起動（Turbopack）
- `npm run test`: Vitest 実行
- `npm run test:watch`: Vitest watch
- `npm run lint`: ESLint 実行
- `npm run build`: Next.js 静的ビルド + 画像最適化
- `npm run start`: `out/` をローカル配信

## ディレクトリ概要

- `src/app/`: ページとルーティング
- `src/components/`: UI コンポーネント
- `src/libs/client.ts`: microCMS クライアントとデータ取得
- `src/utils/`: 汎用ユーティリティとテスト
- `public/nextImageExportOptimizer/`: 最適化済み画像
- `remoteOptimizedImages.js`: 最適化対象画像URLの収集

## 補足

- `next.config.ts` で `output: "export"` を指定しているため、出力は静的サイトです。
- 設計判断の背景は `../docs/adr/` を参照してください。
