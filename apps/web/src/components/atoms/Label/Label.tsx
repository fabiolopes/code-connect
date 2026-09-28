import type { LabelHTMLAttributes, ReactNode } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  children?: ReactNode
}

export function Label({
  required = false,
  className = '',
  children,
  ...rest
}: LabelProps) {
  return (
    <label
      className={`mb-1.5 block text-sm font-semibold text-gray-200 ${className}`.trim()}
      {...rest}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-code-connect-accent">
          *
        </span>
      )}
    </label>
  )
}