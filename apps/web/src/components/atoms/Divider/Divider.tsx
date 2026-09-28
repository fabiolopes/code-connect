import type { HTMLAttributes, ReactNode } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Texto exibido ao centro do divisor (ex.: "ou entre com"). */
  label?: string
  children?: ReactNode
}

export function Divider({ label, className = '', children, ...rest }: DividerProps) {
  const content = label ?? children

  if (!content) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`h-px w-full bg-gray-700 ${className}`.trim()}
        {...rest}
      />
    )
  }

  return (
    <div className={`flex w-full items-center gap-4 ${className}`.trim()} {...rest}>
      <span aria-hidden="true" className="h-px flex-1 bg-gray-700" />
      <span className="shrink-0 text-xs font-medium tracking-wider text-gray-400 uppercase">
        {content}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-gray-700" />
    </div>
  )
}