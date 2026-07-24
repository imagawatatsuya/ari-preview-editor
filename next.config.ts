/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 静的HTMLとして出力する設定 (必須)
  output: 'export',

  // 2. GitHub Pagesで画像などを正しく表示させるための設定
  // 本番ビルド時のみ basePath を適用（ローカル開発では / でアクセス可能）
  basePath: process.env.NODE_ENV === 'production' ? '/ari-preview-editor' : '',

  // 3. Next.jsの画像最適化を無効化 (静的サイトでは不要)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;