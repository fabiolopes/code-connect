import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  children?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-code-connect-accent text-code-connect-dark font-semibold hover:bg-code-connect-accent-hover active:scale-[0.98]',
  secondary:
    'border border-gray-600 bg-transparent text-white hover:border-code-connect-accent hover:text-code-connect-accent',
  ghost: 'bg-transparent text-gray-300 hover:text-code-connect-accent',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-5 text-sm',
  lg: 'h-14 px-6 text-base',
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 ' +
  'focus-visible:ring-2 focus-visible:ring-code-connect-accent focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-code-connect-dark focus-visible:outline-none ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={[
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          data-testid="button-spinner"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}