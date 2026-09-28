import type { ReactNode } from 'react'
import { Typography } from '../../atoms'

export interface AuthTemplateProps {
  /**
   * Banner exibido na metade esquerda da tela.
   * Parametrizado para que cada tela de autenticação (login, cadastro)
   * reutilize este template com o seu próprio banner.
   */
  bannerSrc?: string
  bannerAlt?: string
  /** Título exibido acima do conteúdo injetado. */
  title?: string
  /** Conteúdo do formulário injetado pelo slot `children`. */
  children?: ReactNode
}

export function AuthTemplate({
  bannerSrc,
  bannerAlt = '',
  title,
  children,
}: AuthTemplateProps) {
  return (
    <div className="grid min-h-svh w-full grid-cols-1 bg-code-connect-dark lg:grid-cols-2">
      {bannerSrc && (
        <aside className="relative hidden overflow-hidden lg:block">
          <img
            src={bannerSrc}
            alt={bannerAlt}
            className="absolute inset-0 size-full object-cover"
          />
        </aside>
      )}

      <main className="flex w-full items-center justify-center px-6 py-12 sm:px-10">
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          {title && (
            <div className="flex items-center gap-2 text-code-connect-accent">
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-md border border-code-connect-accent font-bold"
              >
                CC
              </span>
              <Typography as="span" variant="title" className="text-xl">
                {title}
              </Typography>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}