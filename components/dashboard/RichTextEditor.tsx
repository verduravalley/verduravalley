'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, Minus, Link as LinkIcon,
} from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
}

const btnClass = (active: boolean) =>
  `p-1.5 rounded transition-colors ${active ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`;

// Empty editor produces '<p></p>' — treat that as empty
const htmlIsEmpty = (html: string) => !html || html === '<p></p>';

export default function RichTextEditor({ value, onChange, placeholder, dir = 'ltr' }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'rte-link' } }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[100px] px-3 py-2',
        dir,
        'data-placeholder': placeholder || '',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(htmlIsEmpty(html) ? '' : html);
    },
  });

  // Sync external value changes (e.g. reset) — avoid loop on empty content
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incomingEmpty = htmlIsEmpty(value);
    const currentEmpty = htmlIsEmpty(current);
    if (incomingEmpty && currentEmpty) return;
    if (current !== value) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL', prev ?? 'https://');
    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  // Text-align active helper — 'left' is default so it has no stored attribute
  const isAlignActive = (align: string) => {
    if (!editor) return false;
    if (align === 'left') {
      return !editor.isActive({ textAlign: 'center' }) && !editor.isActive({ textAlign: 'right' }) && !editor.isActive({ textAlign: 'justify' });
    }
    return editor.isActive({ textAlign: align });
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">

        {/* Inline marks */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Underline">
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={addLink} className={btnClass(editor.isActive('link'))} title="Link">
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        {/* Headings */}
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2">
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Heading 3">
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet list">
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Numbered list">
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(isAlignActive('left'))} title="Align left">
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(isAlignActive('center'))} title="Align center">
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(isAlignActive('right'))} title="Align right">
          <AlignRight className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        {/* Divider */}
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)} title="Horizontal rule">
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editor area */}
      <div style={{ direction: dir }}>
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .rte-link { color: #2d6a4f; text-decoration: underline; cursor: pointer; }

        /* CSS placeholder — shown when editor is empty and unfocused */
        .ProseMirror[data-placeholder]:not(:focus) p:first-child:only-child:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          float: left;
          height: 0;
        }

        /* Ensure prose styles don't interfere with alignment */
        .ProseMirror [style*="text-align: center"] { text-align: center !important; }
        .ProseMirror [style*="text-align: right"]  { text-align: right  !important; }
        .ProseMirror [style*="text-align: left"]   { text-align: left   !important; }

        /* Lists */
        .ProseMirror ul { list-style-type: disc;    padding-left: 1.25rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.25rem; }

        /* Horizontal rule */
        .ProseMirror hr { border: none; border-top: 1px solid #d1d5db; margin: 0.75rem 0; }
      `}</style>
    </div>
  );
}
