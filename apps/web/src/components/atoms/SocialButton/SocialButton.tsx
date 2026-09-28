import type { ButtonHTMLAttributes } from 'react'

export type SocialProvider = 'github' | 'gmail'

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider
  /** Caminho do logo em `public/`. */
  iconSrc: string
  /** Rótulo acessível do botão. */
  label: string
}

export function SocialButton({
  provider,
  iconSrc,
  label,
  className = '',
  type = 'button',
  disabled = false,
  children,
  ...rest
}: SocialButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={label}
      data-provider={provider}
      className={[
        'grid size-12 place-items-center rounded-lg border border-gray-600',
        'bg-transparent transition-all duration-200',
        'hover:border-code-connect-accent',
        'focus-visible:ring-2 focus-visible:ring-code-connect-accent focus-visible:ring-offset-2 focus-visible:ring-offset-code-connect-dark focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <img src={iconSrc} alt="" aria-hidden="true" className="size-6 object-contain" />
      {children}
    </button>
  )
}