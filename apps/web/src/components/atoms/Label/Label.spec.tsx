import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './Label'

describe('Label (Atom)', () => {
  it('deve renderizar o texto do rótulo', () => {
    render(<Label>E-mail</Label>)

    expect(screen.getByText('E-mail')).toBeInTheDocument()
  })

  it('deve associationar o rótulo ao controle via htmlFor', () => {
    render(
      <>
        <Label htmlFor="campo">Senha</Label>
        <input id="campo" type="password" />
      </>,
    )

    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('deve exibir o asterisco quando required for verdadeiro', () => {
    const { container, rerender } = render(<Label required>Nome</Label>)
    expect(container.querySelector('span[aria-hidden="true"]')).toBeInTheDocument()

    rerender(<Label>Nome</Label>)
    expect(container.querySelector('span[aria-hidden="true"]')).not.toBeInTheDocument()
  })
})