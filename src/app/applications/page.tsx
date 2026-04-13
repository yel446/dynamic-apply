import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Badge, ScoreBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Plus, Search, FileText, Trash2, Copy, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const params = await searchParams
  const statusFilter = params.status
  const searchQuery = params.search

  const applications = await prisma.application.findMany({
    where: {
      ...(statusFilter && statusFilter !== 'all' ? { status: statusFilter } : {}),
      ...(searchQuery
        ? {
            OR: [
              { jobTitle: { contains: searchQuery, mode: 'insensitive' as const } },
              { company: { contains: searchQuery, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  })

  const allApplications = await prisma.application.findMany()
  const statusCounts = {
    all: allApplications.length,
    draft: allApplications.filter(a => a.status === 'draft').length,
    applied: allApplications.filter(a => a.status === 'applied').length,
    interview: allApplications.filter(a => a.status === 'interview').length,
    rejected: allApplications.filter(a => a.status === 'rejected').length,
    offer: allApplications.filter(a => a.status === 'offer').length,
  }

  const statusFilters = [
    { key: 'all', label: 'Toutes' },
    { key: 'draft', label: 'Brouillons' },
    { key: 'applied', label: 'Postulées' },
    { key: 'interview', label: 'Entretiens' },
    { key: 'rejected', label: 'Refusées' },
    { key: 'offer', label: 'Offres' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-800)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Mes Candidatures
          </h1>
          <p className="text-[var(--color-neutral-500)] mt-1">
            {allApplications.length} candidature{allApplications.length !== 1 ? 's' : ''} au total
          </p>
        </div>
        <Link href="/applications/new">
          <Button>
            <Plus className="w-4 h-4" />
            Nouvelle candidature
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status filters */}
          <div className="flex gap-1.5 flex-wrap">
            {statusFilters.map((f) => (
              <Link
                key={f.key}
                href={`/applications?status=${f.key}${searchQuery ? `&search=${searchQuery}` : ''}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  (statusFilter || 'all') === f.key
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-200)]'
                }`}
              >
                {f.label} ({statusCounts[f.key as keyof typeof statusCounts]})
              </Link>
            ))}
          </div>

          {/* Search */}
          <form className="flex-1 md:max-w-xs ml-auto" action="/applications">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-400)]" />
              <input
                type="text"
                name="search"
                placeholder="Rechercher..."
                defaultValue={searchQuery || ''}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--color-neutral-300)] text-sm bg-white focus:border-[var(--color-primary-light)] transition-colors"
              />
              {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
            </div>
          </form>
        </div>
      </div>

      {/* Applications list */}
      {applications.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={FileText}
            title="Aucune candidature trouvée"
            description={searchQuery || statusFilter ? 'Essayez de modifier vos filtres' : 'Créez votre première candidature adaptée avec l\'IA'}
            actionLabel="Nouvelle candidature"
            actionHref="/applications/new"
          />
        </div>
      ) : (
        <div className="card overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_150px_80px_100px_80px] gap-4 px-5 py-3 bg-[var(--color-neutral-50)] border-b border-[var(--color-neutral-200)] text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wider">
            <span>Poste / Entreprise</span>
            <span>Statut</span>
            <span>Score ATS</span>
            <span>Date</span>
            <span></span>
          </div>

          {/* Rows */}
          {applications.map((app, index) => (
            <Link
              key={app.id}
              href={`/applications/${app.id}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_150px_80px_100px_80px] gap-2 md:gap-4 px-5 py-4 hover:bg-[var(--color-neutral-50)] transition-colors border-b border-[var(--color-neutral-100)] last:border-b-0 items-center animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-neutral-800)] truncate">{app.jobTitle}</p>
                <p className="text-xs text-[var(--color-neutral-500)] truncate">{app.company}</p>
              </div>
              <div>
                <Badge variant="status" status={app.status} />
              </div>
              <div>
                {app.atsScore ? <ScoreBadge score={app.atsScore} /> : <span className="text-xs text-[var(--color-neutral-400)]">—</span>}
              </div>
              <span className="text-xs text-[var(--color-neutral-400)]">{formatDate(app.createdAt)}</span>
              <div className="flex justify-end">
                <ExternalLink className="w-4 h-4 text-[var(--color-neutral-300)]" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
