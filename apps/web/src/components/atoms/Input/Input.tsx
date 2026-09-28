import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  hasError?: boolean
  size?: InputSize
}

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'h-10 px-3 text-sm',
  md: 'h-12 px-4 text-sm',
  lg: 'h-14 px-4 text-base',
}

export function Input({
  hasError = false,
  size = 'md',
  className = '',
  id,
  type = 'text',
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <input
      id={inputId}
      type={type}
      aria-invalid={hasError || undefined}
      className={[
        'w-full rounded-md border bg-transparent text-white placeholder:text-gray-500',
        'transition-colors duration-200 outline-none',
        'focus-visible:border-code-connect-accent focus-visible:ring-1 focus-visible:ring-code-connect-accent',
        SIZE_CLASSES[size],
        hasError
          ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400'
          : 'border-gray-600 hover:border-gray-500',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
}