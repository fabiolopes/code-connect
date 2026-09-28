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

  it('deve exibir a legenda padrão abaixo dos botões', () => {
    render(<SocialAuthGroup />)

    expect(screen.getByText('Ou entre com sua rede favorita')).toBeInTheDocument()
  })

  it('deve permitir customizar a legenda', () => {
    render(<SocialAuthGroup caption="ou conecte-se" />)

    expect(screen.getByText('ou conecte-se')).toBeInTheDocument()
  })

  it('deve omitir a legenda quando caption for vazia', () => {
    render(<SocialAuthGroup caption="" />)

    expect(screen.queryByText('Ou entre com sua rede favorita')).not.toBeInTheDocument()
  })

  it('deve desabilitar todos os botões quando disabled for verdadeiro', () => {
    const handleSocialLogin = vi.fn()
    render(<SocialAuthGroup onSocialLogin={handleSocialLogin} disabled />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com GitHub' }))
    expect(handleSocialLogin).not.toHaveBeenCalled()
  })
})