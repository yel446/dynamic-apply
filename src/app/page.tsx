import { prisma } from '@/lib/prisma'
import { RecentApplications } from '@/components/dashboard/RecentApplications'
import { Plus, Eye, User, FileText, CheckCircle2, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const [applications, profileVariants] = await Promise.all([
    prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.profile.findMany(),
  ])

  const stats = {
    total: applications.length,
    draft: applications.filter(a => a.status === 'draft').length,
    applied: applications.filter(a => a.status === 'applied').length,
    offer: applications.filter(a => a.status === 'offer').length,
    avgScore: applications.length > 0
      ? Math.round(applications.reduce((acc, curr) => acc + (curr.atsScore || 0), 0) / applications.filter(a => a.atsScore).length) || 0
      : 0,
    totalProfiles: profileVariants.length
  }

  const baseProfile = profileVariants.find(p => p.isDefault) || profileVariants[0]

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hello Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Bonjour, {baseProfile?.fullName?.split(' ').pop() || 'Landry'}
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Voici l'état des lieux de vos candidatures et de vos profils générés.
          </p>
        </div>
        <Link href="/applications/new" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          <Plus className="w-4 h-4" />
          Nouvelle Candidature
        </Link>
      </div>

      {/* Primary Stats Track */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white rounded-[20px] p-6 shadow-lg shadow-blue-600/20 relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-blue-100">Score Moyen ATS</p>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{stats.avgScore ? `${stats.avgScore}%` : 'N/A'}</h3>
          <p className="text-xs text-blue-100 bg-white/10 inline-block px-2.5 py-1 rounded-full">
            Basé sur {applications.filter(a => a.atsScore).length} analyses
          </p>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-slate-500">Candidatures Totales</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4 text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>{stats.total}</h3>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-slate-500">Profils CV Disponibles</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4 text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>{stats.totalProfiles}</h3>
          <Link href="/profile" className="text-xs text-blue-600 font-medium hover:underline">Gérer mes profils →</Link>
        </div>
        
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium text-slate-500">Status en "Postulé"</p>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <h3 className="text-[40px] font-bold leading-none mb-4 text-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>{stats.applied}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
           <RecentApplications applications={applications} />
        </div>
      </div>
    </div>
  )
}
