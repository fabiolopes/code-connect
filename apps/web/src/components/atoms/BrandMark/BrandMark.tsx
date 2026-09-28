/**
 * Marca gráfica da aplicação (somente ícone), conforme o layout de referência.
 * Desenhada como SVG inline para não depender de arquivo de imagem externo.
 */
export interface BrandMarkProps {
  /** Largura/altura do ícone em pixels. */
  size?: number
  className?: string
  title?: string
}

export function BrandMark({ size = 47, className = '', title }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 47 31"
      width={size}
      height={Math.round((size * 31) / 47)}
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-testid="brand-mark"
      className={className}
    >
      {title && <title>{title}</title>}
      <g stroke="currentColor" strokeWidth="4">
        {/* Anel esquerdo */}
        <ellipse cx="9" cy="16" rx="6" ry="9" />
        {/* Anel direito */}
        <ellipse cx="38" cy="16" rx="6" ry="9" />
        {/* Barra central de conexão */}
        <path d="M18 6.5h7v19h-7z" strokeLinejoin="round" />
        {/* Detalhe superior */}
        <path d="M21 1.5h6v5h-6z" strokeLinejoin="round" />
        {/* Detalhe inferior */}
        <path d="M4 25.5h12v5H4z" strokeLinejoin="round" />
      </g>
    </svg>
  )
}