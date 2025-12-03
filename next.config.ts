/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 静的HTMLとして出力する設定 (必須)
  output: 'export',

  // 2. GitHub Pagesで画像などを正しく表示させるための設定
  // あなたのリポジトリ名に合わせて 'my-new-editor' の部分を変更してください。
  // もしリポジトリ名が 'ari-no-ana-neo' なら '/ari-no-ana-neo' となります。
  basePath: '/ari-preview-editor',

  // 3. Next.jsの画像最適化を無効化 (静的サイトでは不要)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;