// app/admin/dashboard/components/MarkdownEditor.jsx
"use client";

import { useState } from "react";

export default function MarkdownEditor({ value, onChange, placeholder }) {
  const [activeTab, setActiveTab] = useState("write"); // 'write' atau 'preview'

  // Fungsi menyisipkan format teks ke posisi kursor di textarea
  const insertFormatting = (syntaxBefore, syntaxAfter = "") => {
    const textarea = document.getElementById("article-content-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${syntaxBefore}${selectedText || "Teks"}${syntaxAfter}`;

    const newText = 
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end);

    // Panggil handler parent untuk update state formData
    onChange({
      target: {
        name: "content",
        value: newText
      }
    });

    // Kembalikan fokus ke textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, end + syntaxBefore.length);
    }, 0);
  };

  // Simple parser untuk tab Preview (mengubah markdown dasar ke HTML visual)
  const renderMarkdownPreview = (text) => {
    if (!text) return <p className="text-slate-400 italic">Belum ada konten untuk ditampilkan...</p>;

    // Contoh parsing ringan untuk preview langsung di layar
    let html = text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-3 mb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-2 mb-1">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-base font-semibold mt-2 mb-1">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<ins>$1</ins>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/\n/g, '<br />');

    return <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-700 shadow-sm">
      
      {/* TOOLBAR & TAB SWITCHER */}
      <div className="flex flex-wrap justify-between items-center bg-slate-100 dark:bg-slate-800 px-3 py-2 border-b border-slate-300 dark:border-slate-600 gap-2">
        
        {/* Tombol-tombol Format */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting("# ")}
            className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("## ")}
            className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ")}
            className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("#### ")}
            className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Heading 4"
          >
            H4
          </button>

          <span className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></span>

          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Bold"
          >
            <b>B</b>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="px-3 py-1 text-xs italic bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Italic"
          >
            <i>I</i>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("__", "__")}
            className="px-3 py-1 text-xs underline bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("~~", "~~")}
            className="px-3 py-1 text-xs line-through bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm transition"
            title="Strikethrough"
          >
            S
          </button>
        </div>

        {/* Tab Toggle: Tulis vs Preview Langsung */}
        <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-md text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-3 py-1 rounded transition ${activeTab === "write" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
          >
            Tulis
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded transition ${activeTab === "preview" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-600 dark:text-slate-400"}`}
          >
            Preview Langsung
          </button>
        </div>
      </div>

      {/* AREA KONTEN (TAMPILAN TULIS ATAU PREVIEW) */}
      <div className="p-4">
        {activeTab === "write" ? (
          <textarea
            id="article-content-textarea"
            name="content"
            value={value}
            onChange={onChange}
            rows="12"
            placeholder={placeholder || "Tulis isi artikel di sini..."}
            className="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none text-sm font-mono leading-relaxed resize-y"
            required
          ></textarea>
        ) : (
          <div className="min-h-[280px] max-h-[400px] overflow-y-auto">
            {renderMarkdownPreview(value)}
          </div>
        )}
      </div>

    </div>
  );
}