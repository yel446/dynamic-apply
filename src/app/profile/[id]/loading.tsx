import { ChevronLeft, LayoutTemplate } from 'lucide-react'

export default function Loading() {
  return (
    <div className="w-full h-full min-h-[calc(100vh-140px)] flex flex-col gap-6 animate-pulse">
      {/* Header / Back Navigation Skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-200 rounded-lg" />
            <div className="h-4 w-32 bg-slate-100 rounded-md" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-100" />
          <div className="w-32 h-11 rounded-2xl bg-slate-200" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        {/* LEFT COLUMN: Form Skeleton */}
        <div className="w-full xl:w-[50%] flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100" />
                  <div className="h-5 w-40 bg-slate-100 rounded-md" />
                </div>
                <div className="w-4 h-4 bg-slate-100 rounded" />
              </div>
              {i === 1 && (
                <div className="space-y-3 pt-2">
                  <div className="h-10 w-full bg-slate-50 rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-10 w-full bg-slate-50 rounded-lg" />
                    <div className="h-10 w-full bg-slate-50 rounded-lg" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Preview Skeleton */}
        <div className="hidden xl:flex w-[50%] h-full flex-col bg-slate-900 rounded-[32px] overflow-hidden">
          <div className="bg-slate-950 px-8 py-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <div className="h-4 w-48 bg-slate-800 rounded" />
            </div>
          </div>

          <div className="flex-1 w-full p-8">
            <div className="w-full h-full bg-slate-800/50 rounded-lg border border-white/5" />
          </div>
        </div>
      </div>
    </div>
  )
}
