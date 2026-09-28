import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type TypographyVariant =
  | 'display'
  | 'title'
  | 'subtitle'
  | 'label'
  | 'body'
  | 'caption'
  | 'link'

export interface TypographyProps extends ComponentPropsWithoutRef<'p'> {
  /** Elemento renderizado. Por padrão deriva da `variant`. */
  as?: ElementType
  variant?: TypographyVariant
  children?: ReactNode
}

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  display: 'text-3xl sm:text-4xl font-bold leading-tight text-white',
  title: 'text-2xl sm:text-[2rem] font-semibold leading-tight text-white',
  subtitle: 'text-base text-gray-300 leading-relaxed sm:text-lg',
  label: 'text-sm font-semibold text-gray-200',
  body: 'text-sm text-gray-300',
  caption: 'text-xs text-gray-400',
  link: 'text-sm font-semibold text-code-connect-accent transition-colors hover:underline',
}

const VARIANT_TAGS: Record<TypographyVariant, ElementType> = {
  display: 'h1',
  title: 'h2',
  subtitle: 'p',
  label: 'span',
  body: 'p',
  caption: 'span',
  link: 'span',
}

export function Typography({
  as,
  variant = 'body',
  className = '',
  children,
  ...rest
}: TypographyProps) {
  const Tag = (as ?? VARIANT_TAGS[variant]) as ElementType

  return (
    <Tag className={`${VARIANT_CLASSES[variant]} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}