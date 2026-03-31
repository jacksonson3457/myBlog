# myBlog

Next.js + microCMS + AWS Amplify で構築した静的ブログです。

## リポジトリ構成

```text
.
├── README.md                # このファイル（プロジェクト全体の入口）
├── AGENT.md                 # 開発者 / AI エージェント向け運用ガイド
├── docs/
│   └── adr/                 # Architecture Decision Record
├── amplify.yml              # AWS Amplify ビルド設定
└── my-blog/                 # Next.js アプリ本体
```

## 技術スタック

- Framework: Next.js (App Router)
- Language: TypeScript
- CMS: microCMS
- UI: React, MUI, Emotion, Sass
- Test: Vitest
- Deploy: AWS Amplify (静的エクスポート)

## セットアップ

前提:

- Node.js 20 以上推奨
- npm 利用

環境変数（`my-blog/.env.local`）:

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

インストール:

```bash
cd my-blog
npm ci
```

## 開発・テスト・ビルド

```bash
cd my-blog
npm run dev         # 開発サーバ
npm test            # ユニットテスト
npm run lint        # ESLint
npm run build       # 静的出力 + 画像最適化
npm run start       # out/ 配信確認
```

## デプロイ

- Amplify はルート `amplify.yml` を参照します。
- `appRoot` は `my-blog` を指し、`npm test` と `npm run build` を実行後に `out/` を公開します。

## ドキュメント

- 運用ルール: `AGENT.md`
- 設計判断履歴: `docs/adr/`
- アプリ個別メモ: `my-blog/README.md`
