import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SocialButton } from './SocialButton'

describe('SocialButton (Atom)', () => {
  it('deve renderizar somente o logo, usando o rótulo acessível', () => {
    render(<SocialButton provider="github" iconSrc="/Github.png" label="Entrar com GitHub" />)

    const button = screen.getByRole('button', { name: 'Entrar com GitHub' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-provider', 'github')
    expect(button).not.toHaveTextContent('Entrar com GitHub')
  })

  it('deve renderizar o logo com alt vazio por ser decorativo', () => {
    const { container } = render(
      <SocialButton provider="gmail" iconSrc="/Gmail.png" label="Entrar com Gmail" />,
    )

    const image = container.querySelector('img')
    expect(image).toHaveAttribute('src', '/Gmail.png')
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('aria-hidden', 'true')
  })

  it('deve disparar onClick quando acionado pelo usuário', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <SocialButton
        provider="gmail"
        iconSrc="/Gmail.png"
        label="Entrar com Gmail"
        onClick={handleClick}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Entrar com Gmail' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve desabilitar o botão quando disabled for verdadeiro', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <SocialButton
        provider="github"
        iconSrc="/Github.png"
        label="Entrar com GitHub"
        disabled
        onClick={handleClick}
      />,
    )

    const button = screen.getByRole('button', { name: 'Entrar com GitHub' })
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})