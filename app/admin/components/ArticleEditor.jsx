"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Undo, 
  Redo, 
  Minus
} from "lucide-react";
import { useEffect } from "react";

export default function ArticleEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
        link: false,
      }),
      Placeholder.configure({
        placeholder: "Comece a escrever o conteúdo do artigo aqui...",
        emptyEditorClass: "is-editor-empty",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-teal-700 underline hover:text-teal-900 font-medium',
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full my-4 border border-slate-200 shadow-md',
        },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none min-h-[360px] p-5 sm:p-6 text-slate-800 leading-relaxed font-sans",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Keep editor in sync if content changes externally
  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      if (editor.getText() === "" && content !== "") {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL do link:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-teal-600/30 focus-within:border-teal-600 transition-all">
      
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 sm:p-2.5 bg-slate-50 border-b border-slate-200 text-slate-700">
        
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all ${
            editor.isActive("bold") ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Negrito (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-xl text-xs transition-all ${
            editor.isActive("italic") ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Itálico (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* Heading 2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
            editor.isActive("heading", { level: 2 }) ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Título H2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        {/* Heading 3 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
            editor.isActive("heading", { level: 3 }) ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Subtítulo H3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-xl text-xs transition-all ${
            editor.isActive("bulletList") ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Lista com Marcadores"
        >
          <List className="w-4 h-4" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-xl text-xs transition-all ${
            editor.isActive("orderedList") ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Lista Numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        {/* Quote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-xl text-xs transition-all ${
            editor.isActive("blockquote") ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Citação em Bloco"
        >
          <Quote className="w-4 h-4" />
        </button>

        {/* Horizontal Line */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-xl text-xs hover:bg-slate-200/70 text-slate-700 transition-colors"
          title="Linha Divisória"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-xl text-xs transition-all ${
            editor.isActive("link") ? "bg-teal-100 text-teal-900 shadow-2xs" : "hover:bg-slate-200/70 text-slate-700"
          }`}
          title="Inserir / Editar Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-xl text-xs disabled:opacity-30 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          title="Desfazer"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-xl text-xs disabled:opacity-30 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          title="Refazer"
        >
          <Redo className="w-4 h-4" />
        </button>

      </div>

      {/* Editor Content Area */}
      <div className="bg-white min-h-[380px]">
        <EditorContent editor={editor} />
      </div>
      
    </div>
  );
}
