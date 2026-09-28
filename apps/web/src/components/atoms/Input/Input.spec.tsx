import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input (Atom)', () => {
  it('deve renderizar um input com o placeholder informado', () => {
    render(<Input placeholder="voce@exemplo.com" />)

    const input = screen.getByPlaceholderText('voce@exemplo.com')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('deve disparar onChange com o valor digitado', () => {
    const handleChange = vi.fn()
    render(<Input aria-label="E-mail" onChange={handleChange} />)

    const input = screen.getByLabelText('E-mail')
    fireEvent.change(input, { target: { value: 'ana@exemplo.com' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('ana@exemplo.com')
  })

  it('deve marcar o campo como inválido quando hasError for verdadeiro', () => {
    render(<Input aria-label="E-mail" hasError />)

    const input = screen.getByLabelText('E-mail')
    expect(input).toBeInvalid()
    expect(input).toHaveClass('border-red-400')
  })

  it('deve renderizar com o type e size informados', () => {
    render(<Input aria-label="Senha" type="password" size="lg" />)

    const input = screen.getByLabelText('Senha')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveClass('h-14')
  })

  it('não deve permitir interação quando estiver desabilitado', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input aria-label="E-mail" disabled onChange={handleChange} />)

    const input = screen.getByLabelText('E-mail')
    expect(input).toBeDisabled()

    await user.type(input, 'x')
    expect(handleChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('')
  })
})