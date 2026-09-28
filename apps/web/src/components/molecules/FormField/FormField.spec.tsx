import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FormField } from './FormField'

describe('FormField (Molecule)', () => {
  it('deve renderizar o rótulo associado ao input', () => {
    render(<FormField id="email" label="E-mail" />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
  })

  it('deve propagar a digitação para o onChange', () => {
    const handleChange = vi.fn()
    render(<FormField id="email" label="E-mail" onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'ana@exemplo.com' },
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('deve exibir a mensagem de erro e marcar o campo como inválido', () => {
    render(<FormField id="email" label="E-mail" error="E-mail inválido" />)

    const input = screen.getByLabelText(/e-mail/i)
    expect(input).toBeInvalid()
    expect(screen.getByRole('alert')).toHaveTextContent('E-mail inválido')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
  })

  it('deve marcar o campo como obrigatório quando required for verdadeiro', () => {
    render(<FormField id="email" label="E-mail" required />)

    expect(screen.getByLabelText(/e-mail/i)).toBeRequired()
  })
})