import { prisma } from '@/lib/prisma'
import { ProfileForm } from '@/components/forms/ProfileForm'
import { notFound } from 'next/navigation'
import type { ProfileWithRelations } from '@/types'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, Trash2 } from 'lucide-react'
import { deleteProfile } from '@/app/profile/actions'
import { CVPreviewButton, CVLivePreview } from '@/components/cv/CVDynamic'

export default async function ProfileEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const profile = await prisma.profile.findUnique({
    where: { id },
    include: {
      skills: { orderBy: { order: 'asc' } },
      experiences: {
        orderBy: { order: 'asc' },
        include: {
          missions: { orderBy: { order: 'asc' } },
        },
      },
      education: { orderBy: { order: 'asc' } },
      certifications: { orderBy: { order: 'asc' } },
      languages: true,
      customSections: { orderBy: { order: 'asc' } },
    },
  })

  if (!profile) {
    notFound()
  }

  // Cast to ProfileWithRelations since Prisma generated types map identically to it
  const typedProfile = profile as unknown as ProfileWithRelations

  return (
    <div className="w-full h-full min-h-[calc(100vh-140px)] flex flex-col gap-6 animate-fade-in">
      {/* Header / Back Navigation */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {profile.name}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Édition du profil de base
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <form action={async () => {
             'use server'
             await deleteProfile(id)
           }}>
             <button 
               type="submit"
               className="p-3 rounded-2xl border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
               title="Supprimer ce profil"
               onClick={(e) => {
                 if (!confirm("Êtes-vous sûr de vouloir supprimer ce profil ?")) {
                   e.preventDefault()
                 }
               }}
             >
               <Trash2 className="w-5 h-5" />
             </button>
           </form>

           <CVPreviewButton 
             profile={typedProfile} 
             variant="primary"
             className="!bg-slate-900 !text-white !rounded-2xl !px-6 !py-3 !text-sm !font-bold hover:!bg-slate-800 transition-all shadow-xl shadow-slate-200"
           />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        {/* LEFT COLUMN: Form */}
        <div className="w-full xl:w-[50%] flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
            <ProfileForm profile={typedProfile} />
          </div>
        </div>

        {/* RIGHT COLUMN: Live Preview */}
        <div className="hidden xl:flex w-[50%] h-full flex-col bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-white/5 relative ring-1 ring-white/10">
          <div className="bg-slate-950 px-8 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <h2 className="font-bold text-sm text-slate-200 tracking-wide uppercase">Rendu PDF Haute-Fidélité</h2>
            </div>
          </div>

          <div className="flex-1 w-full bg-[#1e222d] overflow-hidden relative p-8">
            <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden group/pdf">
               <CVLivePreview profile={typedProfile} />
            </div>
            {/* Legend or Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
               Mise à jour en temps réel lors de la saisie
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
