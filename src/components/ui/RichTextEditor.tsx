'use client'

import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Type } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  initialValue: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ initialValue, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  
  // Clean initial value - if it's JSON (for bullets), we might need to handle it differently
  // but for general text content:
  const [html, setHtml] = useState(initialValue)

  const handleInput = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML
      setHtml(newHtml)
      onChange(newHtml)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  return (
    <div className={cn("flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all", className)}>
      <div className="flex items-center gap-0.5 p-1.5 bg-slate-50 border-b border-slate-100">
        <ToolbarButton onClick={() => execCommand('bold')} icon={Bold} title="Gras" />
        <ToolbarButton onClick={() => execCommand('italic')} icon={Italic} title="Italique" />
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} icon={List} title="Liste à puces" />
        <ToolbarButton onClick={() => execCommand('insertOrderedList')} icon={ListOrdered} title="Liste numérotée" />
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[120px] outline-none prose prose-sm max-w-none text-slate-700 custom-scrollbar"
        dangerouslySetInnerHTML={{ __html: initialValue }}
        placeholder={placeholder}
      />
    </div>
  )
}

function ToolbarButton({ onClick, icon: Icon, title }: { onClick: () => void, icon: any, title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 hover:text-blue-600 transition-all"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
