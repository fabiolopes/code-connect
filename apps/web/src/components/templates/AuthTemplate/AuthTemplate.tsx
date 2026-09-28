import type { ReactNode } from 'react'
import { BrandMark } from '../../atoms'

export interface AuthTemplateProps {
  /**
   * Banner exibido no lado esquerdo do card.
   * Parametrizado para que cada tela de autenticação (login, cadastro)
   * reutilize este template com o seu próprio banner.
   */
  bannerSrc?: string
  bannerAlt?: string
  /** Rótulo acessível da marca; quando omitido, o ícone é decorativo. */
  brandTitle?: string
  /** Conteúdo do formulário injetado pelo slot `children`. */
  children?: ReactNode
}

export function AuthTemplate({
  bannerSrc,
  bannerAlt = '',
  brandTitle,
  children,
}: AuthTemplateProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-code-connect-page p-4 sm:p-8">
      <div className="flex w-full max-w-[994px] flex-col overflow-hidden rounded-[12px] bg-code-connect-dark lg:grid lg:grid-cols-2">
        {bannerSrc && (
          <aside className="relative m-6 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={bannerSrc}
              alt={bannerAlt}
              className="absolute inset-0 size-full object-cover"
            />
          </aside>
        )}

        <main className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:py-0">
          <div className="flex w-full max-w-[317px] flex-col items-center gap-6">
            <BrandMark className="text-white" title={brandTitle} />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}