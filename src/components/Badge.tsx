import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20',
        secondary:
          'bg-dark-700 text-slate-300 border border-dark-600',
        outline:
          'border border-dark-600 text-slate-400 hover:border-dark-500',
        coral:
          'bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20',
        success:
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        warning:
          'bg-orange-500/10 text-orange-400 border border-orange-500/20',
        glow:
          'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
