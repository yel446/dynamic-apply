import { prisma } from '@/lib/prisma'
import { RecentApplications } from '@/components/dashboard/RecentApplications'
import { Plus, Eye, Search, AlertCircle, FileText, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function DashboardPage() {
  const [applications, profile] = await Promise.all([
    prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.profile.findFirst(),
  ])

  const stats = {
    total: applications.length,
    draft: applications.filter(a => a.status === 'draft').length,
    applied: applications.filter(a => a.status === 'applied').length,
    offer: applications.filter(a => a.status === 'offer').length,
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hello Header */}
      <div className="mb-2">
        <h1 className="text-[32px] font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Bonjour, {profile?.fullName?.split(' ').pop() || 'Landry'}
        </h1>
        <p className="text-slate-500 mt-1">
          Voici ce qui se passe avec votre recherche d'emploi aujourd'hui.
        </p>
      </div>

      {/* Hero Banner Component */}
      <div className="relative overflow-hidden rounded-[24px] bg-slate-900 text-white shadow-xl shadow-blue-900/10 h-64 flex flex-col justify-center px-10">
        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none"></div>
        {/* Placeholder for an image or graphic */}
        <div className="absolute -right-4 -bottom-4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Trouvez le job parfait <br/>en quelques clics
          </h2>
          <p className="text-slate-300 mb-6 text-sm">
            Laissez l'IA optimiser vos candidatures pour passer les filtres ATS.
          </p>
          
          <div className="flex bg-white rounded-full p-1.5 shadow-lg max-w-md">
            <input 
              type="text" 
              placeholder="Poste, mots-clés ou entreprise..." 
              className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-900 focus:outline-none"
            />
            <Link 
              href="/applications/new" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Stats Track */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white rounded-[20px] p-6 shadow-lg shadow-blue-500/20 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-blue-50">Score Moyen ATS</p>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{applications.length > 0 ? '78' : '0'}</h3>
          <p className="text-xs text-blue-100 bg-white/10 inline-block px-2.5 py-1 rounded-full">
            12% en hausse
          </p>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-slate-500">Candidatures (Total)</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4 text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>{stats.total}</h3>
          <p className="text-xs text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-full font-medium">
            +3 ce mois
          </p>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-slate-500">En attente (Brouillons)</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4 text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>{stats.draft}</h3>
        </div>
        
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-slate-500">Postulées</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4 text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>{stats.applied}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <RecentApplications applications={applications} />
        </div>
        <div className="space-y-6">
          {/* Quick CTA Card mimicking the right side of ref */}
          <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
            <h3 className="font-bold text-slate-800 text-lg mb-2 relative z-10" style={{ fontFamily: 'var(--font-heading)' }}>Besoin d'un CV ciblé ?</h3>
            <p className="text-sm text-slate-500 mb-6 relative z-10">
              Générez un profil parfaitement aligné avec l'offre souhaitée et passez les filtres facilement.
            </p>
            <Link href="/applications/new" className="inline-flex w-full justify-center items-center gap-2 bg-slate-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-slate-800 transition-colors relative z-10">
               <Plus className="w-4 h-4" />
               Nouvelle Candidature
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
