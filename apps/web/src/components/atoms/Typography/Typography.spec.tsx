import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Typography } from './Typography'

describe('Typography (Atom)', () => {
  it('deve renderizar o texto com o elemento padrão da variant', () => {
    render(<Typography variant="title">Bem-vindo</Typography>)
    expect(screen.getByRole('heading', { name: 'Bem-vindo' })).toBeInTheDocument()
  })

  it('deve renderizar a variant display como h1', () => {
    render(<Typography variant="display">Code Connect</Typography>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Code Connect')
  })

  it('deve respeitar o elemento informado via prop as', () => {
    render(
      <Typography as="span" variant="body">
        Abrangente
      </Typography>,
    )

    expect(screen.getByText('Abrangente').tagName).toBe('SPAN')
  })

  it('deve aplicar a variant link com a cor de destaque', () => {
    render(<Typography variant="link">Cadastre-se</Typography>)

    expect(screen.getByText('Cadastre-se')).toHaveClass('text-code-connect-accent')
  })

  it('deve concatenar className informado pelo consumidor', () => {
    render(
      <Typography variant="body" className="text-center">
        Alinhado
      </Typography>,
    )

    expect(screen.getByText('Alinhado')).toHaveClass('text-center', 'text-gray-300')
  })
})