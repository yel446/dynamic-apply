import Link from 'next/link'
import { Badge, ScoreBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { FileText, ExternalLink, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Application } from '@prisma/client'

interface RecentApplicationsProps {
  applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <h3
          className="text-lg font-bold text-slate-800"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Candidatures récentes
        </h3>
        {applications.length > 0 && (
          <Link
            href="/applications"
            className="text-sm text-blue-500 font-semibold hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="p-8 pb-12">
          <EmptyState
            icon={FileText}
            title="Aucune candidature"
            description="Commencez par créer votre première candidature adaptée avec l'IA"
            actionLabel="Nouvelle candidature"
            actionHref="/applications/new"
          />
        </div>
      ) : (
        <div className="px-6 pb-6 space-y-4">
          {applications.map((app, index) => (
            <Link
              key={app.id}
              href={`/applications/${app.id}`}
              className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/70 p-4 rounded-2xl transition-colors border border-transparent hover:border-slate-200 animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Fake logo based on company name */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-lg">
                {app.company.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-slate-800 truncate" style={{ fontFamily: 'var(--font-heading)'}}>
                  {app.jobTitle}
                </p>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-sm font-medium text-slate-500 truncate">
                     {app.company}
                   </p>
                   <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                   <span className="text-sm text-slate-400">{formatDate(app.createdAt)}</span>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3">
                <Badge variant="status" status={app.status} />
                {app.atsScore ? (
                   <div className="hidden sm:flex px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold items-center gap-1">
                     <span>{app.atsScore}% Match</span>
                   </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
