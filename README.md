# Connectix2

~~[サイトはこちらから]()~~
まだ未完成なのでデプロイしていません。
**Connectix2**は、各種SNSリンクに加え、**VRChatユーザー向けプロフィール機能**を提供する自己紹介ページ作成アプリです。  
CSSやJavaScriptの知識がなくても、視覚的にプロフィールの外観や機能をカスタマイズできます。

旧バージョンの Connectix をベースに、**Next.js** を用いてフロントエンド・バックエンドともに再構築しています。

## 🎯 目標

- **VRChatユーザー向けのプロフィール共有**  
  VRChatの埋め込み要素をプロフィールに組み込むことで、VRChatユーザー同士がより深くつながれる場を提供
- **パフォーマンス向上**  
  SSR/SSGを活用し、高速なページ表示を実現
- **モダンなUI/UX**  
  Reactベースで使いやすく、見やすいデザインを提供
- **SEO最適化**  
  検索エンジンへの露出を強化
- **柔軟なインフラ構成**  
  AWS + Kubernetes により、スケーラブルで堅牢なデプロイ環境を構築

## 🔐 セキュリティポリシー

Connectix2 は、**VRChat のログイン情報を一切保存・記録しません**。  
ユーザーの認証は、VRChat API の正規の仕組みに従い安全に処理され、個人情報やアカウント情報はアプリケーション側で保管・送信されることはありません。

## 🛠 技術スタック

| 分類              | 使用技術                              |
| ----------------- | ------------------------------------- |
| フレームワーク    | Next.js 15 (React 18) ※ Frontend & Backend |
| 言語              | TypeScript                            |
| UI／スタイリング  | Tailwind CSS, shadcn/ui, Radix UI     |
| Lint／Format      | ESLint, Prettier                      |
| ホスティング      | AWS（EKS + Kubernetes）               |
| パッケージ管理    | pnpm                                  |

## 🧱 デプロイ構成（予定）

- インフラ: AWS + EKS (Elastic Kubernetes Service)
- アプリ: コンテナ化されたNext.jsフルスタックアプリ（フロント・バック統合）
- CI/CD: GitHub Actions or AWS CodePipeline（予定）
- 永続データ管理（将来的に）: RDS, S3 などを想定

## 🙋‍♂️ 貢献

主な貢献者  
[@T4ko0522](https://github.com/T4ko0522)  

バグ報告・機能提案は[Issues](https://github.com/T4ko0522/Connectix2/issues)へどうぞ。  
Pull Requestも歓迎します！

## 📄 ライセンス

Apache License 2.0  
詳細は [LICENSE](https://github.com/T4ko0522/Connectix2/blob/master/LICENSE) を参照してください。
```
Copyright 2025 T4ko0522

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.
```