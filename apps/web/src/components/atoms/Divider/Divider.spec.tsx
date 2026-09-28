import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Divider } from './Divider'

describe('Divider (Atom)', () => {
  it('deve renderizar apenas a linha quando não há label', () => {
    render(<Divider data-testid="divider" />)

    const separator = screen.getByRole('separator')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('deve renderizar o label ao centro do divisor', () => {
    render(<Divider label="ou entre com" />)

    expect(screen.getByText('ou entre com')).toBeInTheDocument()
    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
  })

  it('deve aceitar children como conteúdo alternativo ao label', () => {
    render(<Divider>OU</Divider>)

    expect(screen.getByText('OU')).toBeInTheDocument()
  })
})