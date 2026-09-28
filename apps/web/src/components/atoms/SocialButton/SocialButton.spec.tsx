import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SocialButton } from './SocialButton'

describe('SocialButton (Atom)', () => {
  it('deve renderizar o logo e o texto padrão do provedor', () => {
    render(<SocialButton provider="github" iconSrc="/Github.png" label="Entrar com GitHub" />)

    const button = screen.getByRole('button', { name: 'Entrar com GitHub' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Entrar com GitHub')
    expect(button).toHaveAttribute('data-provider', 'github')
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

  it('deve disparar onClick com o provedor ao ser acionado', () => {
    const handleClick = vi.fn()
    render(
      <SocialButton
        provider="gmail"
        iconSrc="/Gmail.png"
        label="Entrar com Gmail"
        onClick={handleClick}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com Gmail' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve desabilitar o botão quando disabled for verdadeiro', () => {
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

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})