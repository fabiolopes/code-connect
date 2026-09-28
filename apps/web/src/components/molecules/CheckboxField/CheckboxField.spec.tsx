import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CheckboxField } from './CheckboxField'

describe('CheckboxField (Molecule)', () => {
  it('deve renderizar o checkbox com o rótulo informado', () => {
    render(<CheckboxField id="lembrar" label="Lembrar de mim" />)

    expect(screen.getByRole('checkbox', { name: /lembrar de mim/i })).toBeInTheDocument()
  })

  it('deve chamar onChange ao alternar o checkbox', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<CheckboxField id="lembrar" label="Lembrar de mim" onChange={handleChange} />)

    await user.click(screen.getByRole('checkbox', { name: /lembrar de mim/i }))

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('deve desabilitar o checkbox e o rótulo quando disabled for verdadeiro', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <CheckboxField
        id="lembrar"
        label="Lembrar de mim"
        disabled
        onChange={handleChange}
      />,
    )

    const checkbox = screen.getByRole('checkbox', { name: /lembrar de mim/i })
    expect(checkbox).toBeDisabled()

    await user.click(checkbox)
    expect(handleChange).not.toHaveBeenCalled()
  })
})