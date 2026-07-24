'use client';

import React, { useState, useEffect } from 'react';
import { FootnoteRenderer, FootnoteMode } from '@/components/FootnoteRenderer';

const FOOTNOTE_MODE_KEY = 'ari_footnote_mode';

const DEFAULT_TEXT = `ここはリアルタイムプレビューエディタです。
設定を修正し、左寄せで表示されるようにしました。

全角の記号も自動で正規化されます。
例えば全角の［＾1］や、全角コロン：なども認識されます。

URLの自動リンク機能もあります。
https://google.com はリンクになりますが、
設定されたブロックリストにより https://example.com はリンクになりません。[^hoge]

脚注のテストです[^2]。
文末に脚注が表示されます。

[^1]: ここに脚注の内容が入ります。
［^hoge］：数字以外も脚注に変換できます
[^2]: ここに脚注の内容が入ります。リンクも有効です。https://github.com
`;

export default function Home() {
  const [content, setContent] = useState<string>(DEFAULT_TEXT);
  const [footnoteMode, setFootnoteMode] = useState<FootnoteMode>('scroll');
  const [showSettings, setShowSettings] = useState(false);

  // localStorage から設定を読み込み
  useEffect(() => {
    const saved = localStorage.getItem(FOOTNOTE_MODE_KEY);
    if (saved === 'tooltip' || saved === 'scroll') {
      setFootnoteMode(saved);
    }
  }, []);

  const handleModeChange = (mode: FootnoteMode) => {
    setFootnoteMode(mode);
    localStorage.setItem(FOOTNOTE_MODE_KEY, mode);
  };

  return (
    <main className="flex flex-col h-screen w-full bg-gray-50 text-gray-900 font-sans">
      
      {/* ヘッダー */}
      <header className="h-14 flex items-center px-6 border-b border-gray-300 bg-white shrink-0">
        <h1 className="font-bold text-lg text-gray-800">文章アリの穴NEO リアルタイムプレビューエディタ</h1>
        <button
          className="ml-4 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-300 hover:bg-gray-200 cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        >
          ⚙ 設定
        </button>
      </header>

      {/* 管理者設定パネル */}
      {showSettings && (
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 shrink-0">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-bold text-gray-700">脚注クリック動作:</span>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="footnoteMode"
                checked={footnoteMode === 'scroll'}
                onChange={() => handleModeChange('scroll')}
              />
              <span>スクロール</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="footnoteMode"
                checked={footnoteMode === 'tooltip'}
                onChange={() => handleModeChange('tooltip')}
              />
              <span>ツールチップ</span>
            </label>
          </div>
        </div>
      )}

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
            <div className="article-body">
              <FootnoteRenderer content={content} footnoteMode={footnoteMode} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}