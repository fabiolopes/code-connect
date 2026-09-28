import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox (Atom)', () => {
  it('deve renderizar um checkbox acessível e refletindo o estado checked', () => {
    render(<Checkbox aria-label="Lembrar de mim" checked readOnly />)

    expect(screen.getByRole('checkbox', { name: /lembrar de mim/i })).toBeChecked()
  })

  it('deve alternar o estado e chamar onChange ao ser clicado', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox aria-label="Lembrar de mim" onChange={handleChange} />)

    const checkbox = screen.getByRole('checkbox', { name: /lembrar de mim/i })
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(checkbox).toBeChecked()
  })

  it('deve marcar aria-invalid quando hasError for verdadeiro', () => {
    const { rerender } = render(<Checkbox aria-label="Termo" />)
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid')

    rerender(<Checkbox aria-label="Termo" hasError />)
    expect(screen.getByRole('checkbox')).toBeInvalid()
  })

  it('deve ficar desabilitado e ignorar interações', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox aria-label="Lembrar de mim" disabled onChange={handleChange} />)

    const checkbox = screen.getByRole('checkbox', { name: /lembrar de mim/i })
    expect(checkbox).toBeDisabled()

    await user.click(checkbox)
    expect(handleChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
  })
})