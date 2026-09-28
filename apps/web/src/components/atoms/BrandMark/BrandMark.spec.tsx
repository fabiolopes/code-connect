import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrandMark } from './BrandMark'

describe('BrandMark (Atom)', () => {
  it('deve renderizar a marca como elemento decorativo por padrão', () => {
    render(<BrandMark />)

    const mark = screen.getByTestId('brand-mark')
    expect(mark).toBeInTheDocument()
    expect(mark).toHaveAttribute('aria-hidden', 'true')
  })

  it('deve expor o título como rótulo acessível quando informado', () => {
    render(<BrandMark title="Code Connect" />)

    const mark = screen.getByRole('img', { name: 'Code Connect' })
    expect(mark).toBeInTheDocument()
    expect(mark).not.toHaveAttribute('aria-hidden')
  })

  it('deve aplicar o tamanho informado preservando a proporção', () => {
    const { container } = render(<BrandMark size={94} />)

    const mark = container.querySelector('svg')
    expect(mark).toHaveAttribute('width', '94')
    expect(mark).toHaveAttribute('height', '62')
  })

  it('deve aplicar as classes informadas pelo consumidor', () => {
    const { container } = render(<BrandMark className="text-white" />)

    expect(container.querySelector('svg')).toHaveClass('text-white')
  })
})