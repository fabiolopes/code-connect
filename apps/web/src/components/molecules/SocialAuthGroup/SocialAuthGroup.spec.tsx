import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SocialAuthGroup } from './SocialAuthGroup'

describe('SocialAuthGroup (Molecule)', () => {
  it('deve renderizar os botões de GitHub e Gmail com os logos oficiais', () => {
    const { container } = render(<SocialAuthGroup />)

    expect(screen.getByRole('button', { name: 'Entrar com GitHub' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar com Gmail' })).toBeInTheDocument()
    expect(container.querySelector('img[src="/Github.png"]')).toBeInTheDocument()
    expect(container.querySelector('img[src="/Gmail.png"]')).toBeInTheDocument()
  })

  it('deve propagar o provedor selecionado no onSocialLogin', () => {
    const handleSocialLogin = vi.fn()
    render(<SocialAuthGroup onSocialLogin={handleSocialLogin} />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com GitHub' }))
    expect(handleSocialLogin).toHaveBeenCalledWith('github')

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com Gmail' }))
    expect(handleSocialLogin).toHaveBeenCalledWith('gmail')
    expect(handleSocialLogin).toHaveBeenCalledTimes(2)
  })

  it('deve exibir o divisor com o rótulo padrão', () => {
    render(<SocialAuthGroup />)

    expect(screen.getByText('ou entre com')).toBeInTheDocument()
  })

  it('deve permitir customizar o rótulo do divisor', () => {
    render(<SocialAuthGroup dividerLabel="ou cadastre-se" />)

    expect(screen.getByText('ou cadastre-se')).toBeInTheDocument()
  })

  it('deve desabilitar todos os botões quando disabled for verdadeiro', () => {
    const handleSocialLogin = vi.fn()
    render(<SocialAuthGroup onSocialLogin={handleSocialLogin} disabled />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com GitHub' }))
    expect(handleSocialLogin).not.toHaveBeenCalled()
  })
})