import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate (Template)', () => {
  it('deve renderizar o banner com o src e alt informados', () => {
    render(
      <AuthTemplate bannerSrc="/banner.png" bannerAlt="Banner de boas-vindas">
        <p>Formulário</p>
      </AuthTemplate>,
    )

    const banner = screen.getByAltText('Banner de boas-vindas')
    expect(banner).toHaveAttribute('src', '/banner.png')
  })

  it('deve renderizar o conteúdo injetado no slot children', () => {
    render(
      <AuthTemplate>
        <p>Formulário de login</p>
      </AuthTemplate>,
    )

    expect(screen.getByText('Formulário de login')).toBeInTheDocument()
  })

  it('deve exibir o título da aplicação quando informado', () => {
    render(<AuthTemplate title="Code Connect">conteúdo</AuthTemplate>)

    expect(screen.getByText('Code Connect')).toBeInTheDocument()
  })

  it('deve omitir o banner quando bannerSrc não for informado', () => {
    const { container } = render(<AuthTemplate>conteúdo</AuthTemplate>)

    expect(container.querySelector('aside')).not.toBeInTheDocument()
  })

  it('deve reutilizar a mesma estrutura com um banner diferente', () => {
    const { container } = render(
      <AuthTemplate bannerSrc="/cadastro.png" bannerAlt="Banner de cadastro">
        <p>Formulário de cadastro</p>
      </AuthTemplate>,
    )

    expect(container.querySelector('aside')).toBeInTheDocument()
    expect(screen.getByAltText('Banner de cadastro')).toHaveAttribute('src', '/cadastro.png')
    expect(screen.getByText('Formulário de cadastro')).toBeInTheDocument()
  })
})