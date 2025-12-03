'use client';

import React, { useState } from 'react';
import { FootnoteRenderer } from '@/components/FootnoteRenderer';

const DEFAULT_TEXT = `ここはリアルタイムプレビューエディタです。
設定を修正し、左寄せで表示されるようにしました。

全角の記号も自動で正規化されます。
例えば全角の［^1］や、全角コロン：なども認識されます。

URLの自動リンク機能もあります。
https://google.com はリンクになりますが、
設定されたブロックリストにより https://example.com はリンクになりません。

脚注のテストです[^1]。
文末に脚注が表示されます。

[^1]: ここに脚注の内容が入ります。リンクも有効です。
https://github.com
`;

export default function Home() {
  const [content, setContent] = useState<string>(DEFAULT_TEXT);

  return (
    <main className="flex flex-col h-screen w-full bg-gray-50 text-gray-900 font-sans">
      
      {/* ヘッダー */}
      <header className="h-14 flex items-center px-6 border-b border-gray-300 bg-white shrink-0">
        <h1 className="font-bold text-lg text-gray-800">文章アリの穴NEO リアルタイムプレビューエディタ</h1>
        <span className="ml-4 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
          Left Aligned
        </span>
      </header>

      {/* エディタエリア */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ■ 左側：入力エリア (50%に広げました) ■ */}
        <div className="w-[50%] min-w-0 flex flex-col border-r border-gray-300 bg-white">
          <div className="bg-gray-100 px-4 py-1 text-xs font-bold text-gray-500 border-b border-gray-200 shrink-0 uppercase tracking-wide">
            Markdown Input
          </div>
          <textarea
            className="flex-1 w-full p-6 resize-none focus:outline-none font-mono text-sm leading-7 text-gray-800"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="ここにテキストを入力してください..."
            spellCheck={false}
          />
        </div>

        {/* ■ 右側：プレビューエリア (50%に狭めました) ■ */}
        <div className="w-[50%] min-w-0 flex flex-col bg-white">
          <div className="bg-gray-100 px-4 py-1 text-xs font-bold text-gray-500 border-b border-gray-200 shrink-0 uppercase tracking-wide">
            Realtime Preview
          </div>
          <div className="flex-1 w-full h-full overflow-y-auto p-6">
            {/* ▼▼▼ ここを修正しました（max-w-none にして中央寄せを解除） ▼▼▼ */}
            <div className="prose prose-sm max-w-none break-all">
              <FootnoteRenderer content={content} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}